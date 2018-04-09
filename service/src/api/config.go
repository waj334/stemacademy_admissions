package main

import (
	"encoding/json"
	"flag"
	"log"
	"os"
)

//Configuration Structure holding config values
type Configuration struct {
	DbName       string   `json:"dbName"`
	DbUser       string   `json:"dbUser"`
	DbHost       string   `json:"dbHost"`
	DbPasswdFile string   `json:"dbPasswdFile"`
	DbSSLMode    string   `json:"dbSSLMode"`
	ServicePort  string   `json:"servicePort"`
	JwtIssuer    []string `json:"jwtIssuer"`
	TLSCert      string   `json:"TLSCert"`
	TLSKey       string   `json:"TLSKey"`
	LogHTTP      bool     `json:"logHttp"`
	RecaptchaKey string   `json:"recaptchaKey"`
	ClientURL    string   `json:"clientUrl"`
	EmailSMTP    string   `json:"emailSmtp"`
	Email        string   `json:"email"`
	EmailPasswd  string   `json:"emailPasswd"`
	UploadPath   string   `json:"uploadPath"`
}

func getConfig() (Configuration, error) {

	flag.Parse()

	file, err := os.Open(*configPath)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	var conf Configuration

	parser := json.NewDecoder(file)
	if err = parser.Decode(&conf); err != nil {
		log.Fatal(err)
	}

	return conf, err
}
