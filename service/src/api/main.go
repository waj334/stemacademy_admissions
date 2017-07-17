package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
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

	if err == nil {
		//Setup API
		router := setupAPI()

		//Create database tables if not exist
		err = sqlCreateTables()

		if err == nil {
			fmt.Println("Server running on port ", conf.HTTPPort, "...")
			log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", conf.HTTPPort), router))
		} else {
			log.Fatal(err)
		}
	} else {
		log.Fatal(err)
	}
}
