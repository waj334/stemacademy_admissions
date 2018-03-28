package main

import (
	"net/http"

	"github.com/labstack/echo"
)

//APISubmitApplication Processes incoming application payload and inserts data into database
func APISubmitApplication(ctx echo.Context) error {
	app := &Application{}
	err := ctx.Bind(&app)

	if err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, map[string]string{
			"error": "Invalid application data",
		})

	} else {
		//Process application
		err = app.Process()

		if err != nil {
			ctx.JSON(http.StatusUnprocessableEntity, map[string]string{
				"error": "Could not process application data",
			})

			return err
		}
	}

	//Application processed ok
	return ctx.String(http.StatusOK, "{}")
}
