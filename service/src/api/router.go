package main

import "github.com/gorilla/mux"

func newRouter() *mux.Router {

	router := mux.NewRouter().StrictSlash(true)
	//Session-less routes
	for _, route := range routes {
		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Headers("APIKey").
			Handler(route.HandlerFunc)
	}

	//Routes that require session
	for _, route := range sessionRoutes {
		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Headers("APIKey", "Authorization").
			Handler(JWTCheckMiddleware).
			Handler(route.HandlerFunc)
	}

	return router
}
