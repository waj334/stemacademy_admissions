package main

import (
	"fmt"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	"strings"
)

//RouteArray Array structure for holding all routing information
type RouteArray []Route

//MethodFunc HTTP method handler func
type MethodFunc func(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route

//MiddlewareList Array structure for holding all route-level middleware funcs
type MiddlewareList []echo.MiddlewareFunc

//Route Structure for holding information about a specific API route
type Route struct {
	Name       string
	URI        string
	Method     string
	Group      string
	Middleware MiddlewareList
	Handler    echo.HandlerFunc
}

//Create route list
var routes = RouteArray{
	{
		"Login",
		"/login",
		"POST",
		"",
		MiddlewareList{},
		APIAuthenticateUser,
	},
	{
		"User Signup",
		"/signup",
		"POST",
		"",
		MiddlewareList{},
		APICreateUser,
	},
	{
		"User Verification",
		"/user/verify",
		"POST",
		"",
		MiddlewareList{},
		APIVerifyUser,
	},
	{
		"Get All Users (Type)",
		"/user/get/type",
		"POST",
		"admin",
		MiddlewareList{},
		APIGetUsers,
	},
	{
		"Application Submission",
		"/app/submit",
		"POST",
		"user",
		MiddlewareList{}, //MiddleWareApprovedCheck
		APISubmitApplication,
	},
	{
		"Application List",
		"/app/list",
		"GET",
		"admin",
		MiddlewareList{},
		APIGetApplicationList,
	},
	{
		"Get Application",
		"/app/get",
		"POST",
		"admin",
		MiddlewareList{},
		APIGetApplication,
	},
	{
		"Update Application Status",
		"/app/status/update",
		"POST",
		"admin",
		MiddlewareList{},
		APIUpdateApplicationStatus,
	},
	{
		"Roster List",
		"/roster/list",
		"GET",
		"admin",
		MiddlewareList{},
		APIGetRoster,
	},
	{
		"Set Assignment",
		"/app/assign",
		"POST",
		"admin",
		MiddlewareList{},
		APISetAssignment,
	},
	{
		"Request Password Reset",
		"/user/reset/request",
		"POST",
		"",
		MiddlewareList{},
		APIRequestPasswordReset,
	},
	{
		"Reset Password",
		"/user/reset",
		"POST",
		"",
		MiddlewareList{},
		APIResetUserPassword,
	},
	{
		"Upload Application Attachment",
		"/app/upload",
		"POST",
		"user",
		MiddlewareList{},
		APIUploadFile,
	},
}

//InitAPI Initialize the API router
func InitAPI(config *Configuration) (*echo.Echo, error) {
	e := echo.New()

	if config.LogHTTP {
		e.Use(middleware.Logger())
	}

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: config.Origins,
		AllowHeaders: []string{
			echo.HeaderOrigin,
			echo.HeaderContentType,
			echo.HeaderAccept,
			echo.HeaderAccessControlRequestHeaders,
			echo.HeaderAccessControlRequestMethod,
			echo.HeaderAcceptEncoding,
			echo.HeaderAuthorization,
		},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE, echo.OPTIONS},
	}))

	//JWT Middleware
	jwtMW := middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey: *signingKey,
		Claims:     &UserJWTClaims{},
	})

	//Create groups
	//TODO: Use signing certificate to sign JWT
	ga := e.Group("/admin", jwtMW, MiddleWareAdminCheck) //Requires admin rights
	gu := e.Group("/user", jwtMW)

	for _, route := range routes {
		var g *echo.Group

		if strings.Compare(route.Group, "admin") == 0 {
			g = ga
		} else if strings.Compare(route.Group, "user") == 0 {
			g = gu
		} else {
			g = nil
		}

		if CreateRoute(e, g, &route) == nil {
			return nil, fmt.Errorf("Could not create Route %s", route.Name)
		}
	}

	return e, nil
}

//CreateRoute Create a API route
func CreateRoute(e *echo.Echo, g *echo.Group, r *Route) *echo.Route {
	var method MethodFunc

	if g == nil {
		switch r.Method {
		case "GET":
			method = e.GET
		case "POST":
			method = e.POST
		case "PUT":
			method = e.PUT
		case "DELETE":
			method = e.DELETE
		default:
			return nil
		}
	} else {
		switch r.Method {
		case "GET":
			method = g.GET
		case "POST":
			method = g.POST
		case "PUT":
			method = g.PUT
		case "DELETE":
			method = g.DELETE
		default:
			return nil
		}
	}

	return method(r.URI, r.Handler, r.Middleware...)
}
