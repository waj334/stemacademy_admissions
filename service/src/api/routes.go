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
		"/admin/session/login",
		AuthUser,
	},
	route{
		"Signout",
		"POST",
		"/admin/session/signout",
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
