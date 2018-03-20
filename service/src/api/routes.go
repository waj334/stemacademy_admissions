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
		"APIUserLogin",
		"POST",
		"/admin/session/login",
		APIUserLogin,
	},
	route{
		"APIUserLogout",
		"POST",
		"/admin/session/signout",
		APIUserLogout,
	},
	route{
		"APICreateUser",
		"POST",
		"/user/create",
		APICreateUser,
	},
	route{
		"APIApplicationSubmit",
		"POST",
		"/app/submit",
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
