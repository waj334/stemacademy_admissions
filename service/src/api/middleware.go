package main

import (
	"fmt"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
)

//MiddleWareAdminCheck Middleware for checking if user authenticated with admin rights
func MiddleWareAdminCheck(next echo.HandlerFunc) echo.HandlerFunc {
	return func(ctx echo.Context) error {
		//Extract info from JWT
		user := ctx.Get("user").(*jwt.Token)
		claims := user.Claims.(*UserJWTClaims)

		fmt.Println(claims)
		admin := claims.Admin

		if admin == true {
			fmt.Println("is admin: ", admin)
			return next(ctx)
		}

		return echo.ErrForbidden
	}
}
