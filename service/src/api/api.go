package main

import (
	"fmt"

	"github.com/gorilla/mux"
)

func setupAPI() *mux.Router {
	fmt.Println("Setting up the API")

	router := newRouter()

	fmt.Println("Setup Complete")

	return router
}
