package main

import "net/http"

type route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type routeList []route

var routes = routeList{
	route{
		"Login",
		"POST",
		"/session/login",
		Login,
	},
	route{
		"Signout",
		"POST",
		"/session/signout",
		Signout,
	},
	route{
		"CreateUser",
		"POST",
		"/user/create",
		CreateUser,
	},
	route{
		"apiStudentAppSubmit",
		"POST",
		"/app/student/submit",
		apiStudentAppSubmit,
	},
}

var sessionRoutes = routeList{
/*route{
	"GalleryList",
	"GET",
	"/gallery/list",
	galleryList,
},*/
}
