package main

import (
	"bytes"
	"fmt"
	"net/http"

	jwt "github.com/dgrijalva/jwt-go"
	recaptcha "github.com/dpapathanasiou/go-recaptcha"
	"github.com/labstack/echo"
	"github.com/lib/pq"
	"github.com/sony/sonyflake"
	"golang.org/x/crypto/bcrypt"
)

//APICreateUser API call for creating a new user
func APICreateUser(ctx echo.Context) error {
	type req struct {
		User      User   `json:"user"`
		Recaptcha string `json:"recaptcha"`
	}

	r := &req{}
	err := ctx.Bind(&r)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Invalid user data",
		})
	} else {

		//Only allow admins to create admins. Skip reCaptcha if is admin.
		if r.User.Type == AccountTypeAdmin {
			//Check claims for admin flag
			userClaims := ctx.Get("user").(*jwt.Token)
			claims := userClaims.Claims.(*UserJWTClaims)

			if claims.AccountType != AccountTypeAdmin {
				return ctx.JSON(http.StatusForbidden, map[string]string{
					"error": "Action not possible.",
				})
			}

		} else {

			//Verify reCAPTCH
			result, err := recaptcha.Confirm(ctx.Request().RemoteAddr, r.Recaptcha)

			if err != nil {
				ctx.Logger().Error(err)
				return ctx.JSON(http.StatusUnauthorized, map[string]string{
					"error": "Could not validate reCAPTCHA",
				})
			}

			if result == false {
				return ctx.JSON(http.StatusUnauthorized, map[string]string{
					"error": "reCAPTCHA failed",
				})
			}
		}

		err = CreateUser(&r.User, r.User.Password)

		if err != nil {
			ctx.Logger().Error(err)
			switch e := err.(type) {
			case *ErrAuthUserExists:
				return ctx.JSON(http.StatusNotAcceptable, map[string]string{
					"error": e.Error(),
				})
			default:
				return ctx.JSON(http.StatusInternalServerError, map[string]string{
					"error": "Could not create user. Unexpected error.",
				})
			}
		}
	}

	//Send email verification. Skip if creating admin
	if !r.User.Verified {
		flake := sonyflake.NewSonyflake(sonyflake.Settings{})
		token, _ := flake.NextID()
		tokenStr := fmt.Sprint(token)

		if err != nil {
			ctx.Logger().Error(err)
			return ctx.JSON(http.StatusInternalServerError, map[string]string{
				"error": "Unexpected error occurred. (EMAIL_TOKEN)",
			})
		}

		//Set token in users table
		database.UpdateVerifyToken(r.User.Email, tokenStr)

		buffer := new(bytes.Buffer)
		VerificationMessage(r.User.Email, config.ClientURL, tokenStr, buffer)

		//Send Email
		err = SendEmail(r.User.Email, "STEM Summer Academy Email Verification", string(buffer.Bytes()))

		if err != nil {
			ctx.Logger().Error(err)
			return ctx.JSON(http.StatusInternalServerError, map[string]string{
				"error": "Unexpected error occurred. (EMAIL_SEND)",
			})
		}
	} else {
		database.ChangeUserVerifiedStatus(r.User.Email, true)
	}

	return ctx.JSON(http.StatusOK, map[string]string{})
}

//APIRemoveUser API call the removes user from database
func APIRemoveUser(ctx echo.Context) error {
	type req struct {
		Email string `json:"email"`
	}

	r := &req{}
	err := ctx.Bind(&r)

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusUnprocessableEntity, map[string]string{
			"error": "Invalid input data received.",
		})
	}

	err = database.RemoveUser(r.Email)

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unexpected database error",
		})
	}

	return ctx.JSON(http.StatusOK, map[string]string{})
}

//APIGetUsers Get users from database
func APIGetUsers(ctx echo.Context) error {
	type req struct {
		Type int `json:"type"`
	}

	r := &req{}
	err := ctx.Bind(&r)

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusUnprocessableEntity, map[string]string{
			"error": "Invalid request data.",
		})
	}

	users, err := database.GetUsers(r.Type)

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unexpected error occurred.",
		})
	}

	//Strip passwords from results
	for i, user := range users {
		user.Password = ""
		users[i] = user
	}

	return ctx.JSON(http.StatusOK, users)
}

//APIVerifyUser Verifies the user associated wit the token param value
func APIVerifyUser(ctx echo.Context) error {
	type req struct {
		Token string `json:"token"`
	}

	r := &req{}
	err := ctx.Bind(&r)

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusUnprocessableEntity, map[string]string{
			"error": "Invalid request data.",
		})
	}

	//Update verifaction status if token exists
	err = database.UpdateVerificationByToken(r.Token)

	if err != nil {
		ctx.Logger().Error(err)

		switch err.(type) {
		case *ErrTokenNotAssociated:
			return ctx.JSON(http.StatusUnauthorized, map[string]string{
				"error": "No user associated with the given link.",
			})
		default:
			return ctx.JSON(http.StatusInternalServerError, map[string]string{
				"error": "Unexpected error occurred.",
			})
		}
	}

	return ctx.JSON(http.StatusOK, map[string]string{})
}

//APIRequestPasswordReset Sends password reset link to email if present in database
func APIRequestPasswordReset(ctx echo.Context) error {
	type req struct {
		Email string `json:"email"`
	}

	r := &req{}
	err := ctx.Bind(&r)

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusUnprocessableEntity, map[string]string{
			"error": "Invalid request data.",
		})
	}

	//Get user info from database
	user, err := database.GetUserInfo(r.Email)

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusNotFound, map[string]string{
			"error": "No user associated with the given email.",
		})
	}

	//Send email verification
	flake := sonyflake.NewSonyflake(sonyflake.Settings{})
	token, _ := flake.NextID()
	tokenStr := fmt.Sprint(token)

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unexpected error occurred. (EMAIL_TOKEN)",
		})
	}

	//Set token in users table
	database.UpdateResetToken(user.Email, tokenStr)

	//Generate reset message
	buffer := new(bytes.Buffer)
	ResetMessage(config.ClientURL, tokenStr, buffer)

	//Send Email
	err = SendEmail(user.Email, "STEM Summer Academy Account Password Reset", string(buffer.Bytes()))

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unexpected error occurred. (EMAIL_SEND)",
		})
	}

	return ctx.JSON(http.StatusOK, map[string]string{})
}

//APIResetUserPassword Resets password of user associated with the given token
func APIResetUserPassword(ctx echo.Context) error {
	type req struct {
		Token    string `json:"token"`
		Password string `json:"password"`
	}

	r := &req{}
	err := ctx.Bind(r)

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusUnprocessableEntity, map[string]string{
			"error": "Invalid data received.",
		})
	}

	//Hash password
	hash, err := bcrypt.GenerateFromPassword([]byte(r.Password), 10)

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unexpected error occurred",
		})
	}

	//Update database if token exists
	err = database.UpdatePasswordByToken(r.Token, string(hash))

	if err != nil {
		ctx.Logger().Error(err)

		switch err.(type) {
		case *pq.Error:
			return ctx.JSON(http.StatusUnauthorized, map[string]string{
				"error": "No user associated with the given link.",
			})
		default:
			return ctx.JSON(http.StatusInternalServerError, map[string]string{
				"error": "Unexpected error occurred.",
			})
		}
	}

	return ctx.JSON(http.StatusOK, map[string]string{})
}
