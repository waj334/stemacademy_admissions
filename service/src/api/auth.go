package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strings"
	"time"

	"github.com/SermoDigital/jose/crypto"
	"github.com/SermoDigital/jose/jws"
)

//LoginInfo struct holding login credential payload
type LoginInfo struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

//AuthUser Authorizes a user returning session token
func AuthUser(w http.ResponseWriter, r *http.Request) {
	info := new(LoginInfo)
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&info)
	//config, _ := getConfig()

	//Retrieve user login info from database
	pwdHash, salt, err := sqlGetUserPasswordHash(info)

	if err == nil {
		//Hash incoming login info
		hash := hashPasswordInput(info.Password, salt)

		if strings.Compare(pwdHash, hash) == 0 {
			//Create JWS claims
			claims := jws.Claims{}
			claims.SetExpiration(time.Now().Add(time.Hour))
			//claims.SetAudience(config.JwtIssuer...)
			claims.Set("User", info.Username)

			//Generate JWT for this user
			token := jws.NewJWT(claims, crypto.SigningMethodHS256)
			sToken, _ := token.Serialize([]byte("abcdef"))

			//Write response containing token
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusAccepted)
			w.Write([]byte("{\"token\": \"" + string(sToken) + "\"}"))
		} else {
			//Invalid password
			w.WriteHeader(http.StatusUnauthorized)
		}
	} else {
		w.WriteHeader(http.StatusInternalServerError)
	}
}

//Signout API call for user signout
func Signout(w http.ResponseWriter, r *http.Request) {
	b, err := ioutil.ReadAll(r.Body)
	if err == nil {
		sessionID := string(b)
		DestroySession(sessionID)
	}
}
