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
var sql *SQL
var apiKey string

func main() {
	configPath = flag.String(
		"conf",
		"config.json",
		"Path to configuration json file",
	)

	conf, err := getConfig()

	//CORS
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "content-type"})
	originsOk := handlers.AllowedOrigins(conf.JwtIssuer)
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	if err == nil {
		//Create SQL Wrapper and connect to db
		sql = NewSQL()
		err = sql.Open()
		defer sql.Close()

		if err == nil {
			//Create database tables if not exist
			err = sql.SQLCreateTables()

			if err == nil {
				//Load encryption keys
				err = LoadRSAKeys()

				if err == nil {

					//Setup API
					router := setupAPI()

					//Set API Key
					apiKey = conf.APIKey

					if err == nil {
						//Listen on port whilst checking for APIKey
						fmt.Println("Server running on port ", conf.ServicePort, "...")
						http.ListenAndServe(fmt.Sprintf(":%s", conf.ServicePort), handlers.CORS(originsOk, headersOk, methodsOk)(APIKeyCheckMiddleware(router)))
					}
				}
			}
		}
	}

	//Log if there was some error
	if err != nil {
		log.Fatal(err)
	}
}
