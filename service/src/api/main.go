package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
)

//Use for conf file
var configPath *string

func main() {
	configPath = flag.String(
		"conf",
		"config.json",
		"Path to configuration json file",
	)

	conf, err := getConfig()

	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "content-type"})
	originsOk := handlers.AllowedOrigins(conf.JwtIssuer)
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	if err == nil {
		//Setup API
		router := setupAPI()

		//Create database tables if not exist
		err = SQLCreateTables()

		if err == nil {
			fmt.Println("Server running on port ", conf.ServicePort, "...")
			log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", conf.ServicePort), handlers.CORS(originsOk, headersOk, methodsOk)(router)))
		} else {
			log.Fatal(err)
		}
	} else {
		log.Fatal(err)
	}
}
