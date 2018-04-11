package main

import (
	"bytes"
	"fmt"
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	recaptcha "github.com/dpapathanasiou/go-recaptcha"
	"github.com/labstack/echo"
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

		//Only allow admins to create admins
		if r.User.Type == AccountTypeAdmin {
			//Check claims for admin flag
			userClaims := ctx.Get("user").(*jwt.Token)
			claims := userClaims.Claims.(*UserJWTClaims)

			if claims.AccountType != AccountTypeAdmin {
				return ctx.NoContent(http.StatusForbidden)
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

	//Send email verification
	//Generate token using JWT
	claims := &UserJWTClaims{
		r.User.Email,
		r.User.Type,
		r.User.Verified,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		},
	}

	//Generate JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte("supersecure"))

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unexpected error occurred. (EMAIL_TOKEN)",
		})
	}

	buffer := new(bytes.Buffer)
	VerificationMessage(r.User.Email, config.ClientURL, signedToken, buffer)

	//Send Email
	err = SendEmail(r.User.Email, string(buffer.Bytes()))

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unexpected error occurred. (EMAIL_SEND)",
		})
	}

	return ctx.NoContent(http.StatusAccepted)
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
	//Extract info from JWT
	token, err := jwt.Parse(ctx.Param("token"), func(token *jwt.Token) (interface{}, error) {
		return []byte("supersecure"), nil
	})

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusForbidden, map[string]string{
			"error": "Invalid token",
		})
	}

	claims := token.Claims.(*UserJWTClaims)

	//Check database info
	userInfo, err := database.GetUserInfo(claims.Email)

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusForbidden, map[string]string{
			"error": "Could not verify email",
		})
	}

	//Change verified status
	err = database.ChangeUserVerifiedStatus(userInfo.Email, true)

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusForbidden, map[string]string{
			"error": "Unexpected database error.",
		})
	}

	return ctx.Redirect(http.StatusOK, fmt.Sprintf("%s/verificationSuccess", config.ClientURL))
}
