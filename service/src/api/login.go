package main

import (
	"crypto/sha512"
	"encoding/hex"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strings"
)

//LoginInfo struct holding login info passed from webui
type LoginInfo struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

//Login API call for user login
func Login(w http.ResponseWriter, r *http.Request) {
	info := new(LoginInfo)
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&info)

	//Get this user's password
	hash, salt, err := sqlGetUserPassword(info)

	if err == nil {
		//Hash inputed password

		//Compare entered password to database
		if verifyPassword(hash, info.Password, salt) == true {
			//Generate session for this user
			session := GenSession(info.Username)

			//Write response containing session ID
			w.WriteHeader(http.StatusAccepted)
			w.Write([]byte(session.ID))
		} else {
			w.WriteHeader(http.StatusUnauthorized)
		}
	} else {
		//Invalid username
		w.WriteHeader(http.StatusUnauthorized)
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

func verifyPassword(pwdHash, pwdInput, salt string) bool {
	hasher := sha512.New()
	hasher.Write([]byte(pwdInput + salt))
	inputHash := hex.EncodeToString(hasher.Sum(nil))

	if strings.Compare(pwdHash, inputHash) != 0 {
		return false
	}

	return true
}
