package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"
	"os/signal"
	"time"

	"github.com/dpapathanasiou/go-recaptcha"
)

var configPath *string
var config Configuration
var database *Database

func main() {
	//Read configuration
	configPath = flag.String(
		"conf",
		"config.json",
		"Path to configuration json file",
	)

	config, err := getConfig()

	if err == nil {

		//Initialize API
		e, err := InitAPI()

		//Initialize reCAPTCHA
		recaptcha.Init(config.RecaptchaKey)

		if err == nil {
			//Open database connection
			database, err = ConnectDB(&config)

			if err == nil {
				//Create database tables
				err := database.CreateTables()

				if err == nil {

					go func() {
						//Start API service
						if len(config.TLSCert) > 0 && len(config.TLSKey) > 0 {
							e.Logger.Fatal(e.StartTLS(":443", config.TLSCert, config.TLSKey)) //Override port to 443
						} else {
							e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", config.ServicePort)))
						}
					}()

				} else {
					e.Logger.Fatal(err)
				}

			} else {
				e.Logger.Fatal(err)
			}
		} else {
			//Couldn't properly create an API route
			e.Logger.Fatal(err)
		}

		//Wait for interrupt signal to gracefully shutdown the server with
		// a timeout of 10 seconds.
		quit := make(chan os.Signal)
		signal.Notify(quit, os.Interrupt)
		<-quit
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		if err = database.db.Close(); err != nil {
			e.Logger.Fatal(err)
		}

		if err = e.Shutdown(ctx); err != nil {
			e.Logger.Fatal(err)
		}

	} else {
		log.Fatal(err)
	}
}
