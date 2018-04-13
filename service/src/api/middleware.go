package main

import (
	"log"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
)

//MiddleWareAdminCheck Middleware for checking if user authenticated with admin rights
func MiddleWareAdminCheck(next echo.HandlerFunc) echo.HandlerFunc {
	return func(ctx echo.Context) error {
		//Extract info from JWT
		user := ctx.Get("user").(*jwt.Token)
		claims := user.Claims.(*UserJWTClaims)

		log.Print("Account type is: ", claims.AccountType)

		if claims.AccountType == AccountTypeAdmin {
			return next(ctx)
		}

		return echo.ErrForbidden
	}
}

//MiddleWareApprovedCheck Middleware for checking if user has been approved by an admin
func MiddleWareApprovedCheck(next echo.HandlerFunc) echo.HandlerFunc {
	return func(ctx echo.Context) error {
		//Extract info from JWT
		user := ctx.Get("user").(*jwt.Token)
		claims := user.Claims.(*UserJWTClaims)

		log.Print("Account type is: ", claims.AccountType)

		if claims.Approved == true {
			return next(ctx)
		}

		return echo.ErrForbidden
	}
}
