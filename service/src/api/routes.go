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
		APIUserLogin,
	},
	route{
		"Signout",
		"POST",
		"/admin/session/signout",
		APIUserLogout,
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
		APIApplicationSubmitStudent,
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
