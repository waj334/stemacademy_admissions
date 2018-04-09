package main

import (
	"net/http"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
)

//APIUploadFile Upload a file and store record in database
func APIUploadFile(ctx echo.Context) error {
	file, err := ctx.FormFile("file")

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unexpected file error.",
		})
	}

	//Open file
	src, err := file.Open()

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Could not open uploaded file.",
		})
	}

	defer src.Close()

	//Create database record
	userClaims := ctx.Get("user").(*jwt.Token)
	claims := userClaims.Claims.(*UserJWTClaims)

	appID := ctx.FormValue("appId")
	fd, err := ProcessUpload(&src, appID, claims.Email)

	if err != nil {
		ctx.Logger().Error(err)
		return ctx.JSON(http.StatusInternalServerError, map[string]string{
			"error": "There was a problem processing upload.",
		})
	}

	return ctx.JSON(http.StatusAccepted, fd)
}
