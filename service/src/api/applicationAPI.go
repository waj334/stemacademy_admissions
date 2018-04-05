package main

import (
	"fmt"
	"net/http"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"github.com/sony/sonyflake"
)

//APISubmitApplication Processes incoming application payload and inserts data into database
func APISubmitApplication(ctx echo.Context) error {
	app := &Application{}
	err := ctx.Bind(&app)

	if err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, map[string]string{
			"error": "Invalid application data",
		})
	}

	//Set Application ID
	flake := sonyflake.NewSonyflake(sonyflake.Settings{})
	id, _ := flake.NextID()
	app.ID = fmt.Sprint(id)

	//Set email for this application submission
	userClaims := ctx.Get("user").(*jwt.Token)
	claims := userClaims.Claims.(*UserJWTClaims)
	app.Email = claims.Email

	//Process application
	err = app.Process()

	if err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, map[string]string{
			"error": "Could not process application data",
		})
	}

	//Application processed ok
	return ctx.String(http.StatusOK, "{}")
}

//APIGetApplicationList API call that gets basic information on all applications in the database
func APIGetApplicationList(ctx echo.Context) error {
	list, err := database.GetApplicationList()

	if err == nil {
		return ctx.JSON(http.StatusOK, list)
	}

	return err
}

//APIGetApplication API call that retrieves a single application by its ID
func APIGetApplication(ctx echo.Context) error {
	type req struct {
		ID string `json:"id"`
	}

	data := &req{}
	err := ctx.Bind(&data)

	if err == nil {
		app, err := database.GetApplication(data.ID)

		if err == nil {
			return ctx.JSON(http.StatusOK, app)
		}
	}

	return err
}
