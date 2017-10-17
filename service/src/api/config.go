package main

import (
	"encoding/json"
	"flag"
	"log"
	"os"
)

type configuration struct {
	DbName        string   `json:"dbName"`
	DbUser        string   `json:"dbUser"`
	DbHost        string   `json:"dbHost"`
	DbPassword    string   `json:"dbPassword"`
	DbSSLMode     string   `json:"dbSSLMode"`
	AddrMemcached string   `json:"addrMemcached"`
	ServicePort   string   `json:"servicePort"`
	JwtIssuer     []string `json:"jwtIssuer"`
}

func getConfig() (configuration, error) {

	flag.Parse()

	file, err := os.Open(*configPath)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	var conf configuration

	parser := json.NewDecoder(file)
	if err = parser.Decode(&conf); err != nil {
		log.Fatal(err)
	}

	return conf, err
}
