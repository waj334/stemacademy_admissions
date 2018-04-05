package main

import (
	"fmt"
	"net/http"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
)

//APICreateUser API call for creating a new user
func APICreateUser(ctx echo.Context) error {
	user := new(User)
	err := ctx.Bind(&user)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Invalid user data",
		})
	} else {

		//Only allow admins to create admins
		if user.Type == AccountTypeAdmin {
			//Check claims for admin flag
			userClaims := ctx.Get("user").(*jwt.Token)
			claims := userClaims.Claims.(*UserJWTClaims)

			if claims.AccountType != AccountTypeAdmin {
				return ctx.NoContent(http.StatusForbidden)
			}
		}

		err := CreateUser(user, user.Password)

		if err != nil {
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
		return ctx.JSON(http.StatusUnprocessableEntity, map[string]string{
			"error": "Invalid request data.",
		})
	}

	users, err := database.GetUsers(r.Type)

	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unexpected error occurred.",
		})
	}

	return ctx.JSON(http.StatusOK, users)
}

//APIChangeUserApproval Approves user for application process
func APIChangeUserApproval(ctx echo.Context) error {
	type req struct {
		User     string `json:"user"`
		Approved bool   `json:"approved"`
	}

	r := &req{}
	err := ctx.Bind(&r)

	if err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, map[string]string{
			"error": "Invalid request data.",
		})
	}

	err = database.ChangeUserApprovalStatus(r.User, r.Approved)

	if err != nil {
		return ctx.JSON(http.StatusNotFound, map[string]string{
			"error": fmt.Sprintf("User, %s, not found.", r.User),
		})
	}

	return ctx.NoContent(http.StatusOK)
}
