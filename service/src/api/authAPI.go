package main

import (
	"net/http"

	"github.com/labstack/echo"
)

//APIAuthenticateUser API call for user login authentication
func APIAuthenticateUser(ctx echo.Context) (err error) {
	//Get authentication info
	authInfo := new(UserAuth)
	if err = ctx.Bind(authInfo); err != nil {
		return err
	}

	//Attempt authentication
	token, err := AuthenticateUser(authInfo.Username, authInfo.Password)

	if err != nil {
		switch e := err.(type) {
		case *ErrAuthInvalidPassword:
			return ctx.JSON(http.StatusUnauthorized, map[string]string{
				"error": e.Error(),
			})
		case *ErrAuthUserNotVerified:
			return ctx.JSON(http.StatusForbidden, map[string]string{
				"error": e.Error(),
			})
		}
	}

	//Create signed token
	//TODO: Use signing certificate to sign JWT
	signedToken, err := token.SignedString([]byte("supersecure"))

	if err == nil {
		return ctx.JSON(http.StatusOK, map[string]string{
			"token": signedToken,
		})
	}

	return ctx.String(http.StatusInternalServerError, "")
}
