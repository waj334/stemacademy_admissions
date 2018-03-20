package main

import (
	"net/http"

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

		//Set admin flag to false
		user.Admin = false

		err = CreateUser(user, user.Password)

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, map[string]string{
				"error": "Could not create user",
			})
		}
	}

	return err
}

//APICreateAdmin API call for creating a new admin user
func APICreateAdmin(ctx echo.Context) error {
	user := new(User)
	err := ctx.Bind(&user)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Invalid user data",
		})
	} else {

		//Set admin flag to True
		user.Admin = true

		err := CreateUser(user, user.Password)

		if err != nil {
			ctx.JSON(http.StatusUnprocessableEntity, map[string]string{
				"error": err.Error(),
			})
		}
	}

	return err
}
