package main

import (
	"encoding/json"
	"net/http"
)

//User struct holding details about an user
type User struct {
	FirstName   string    `json:"firstName"`
	LastName    string    `json:"lastName"`
	Email       string    `json:"email"`
	Username    string    `json:"username"`
	Credentials LoginInfo `json:"credentials"`
}

//CreateUser API call to create a new user
func CreateUser(w http.ResponseWriter, r *http.Request) {
	newUser := new(User)
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&newUser)

	if err == nil {
		err := sqlRegisterNewUser(newUser)

		if err == nil {
			w.WriteHeader(http.StatusAccepted)
		} else {
			w.WriteHeader(http.StatusConflict)
		}
	} else {
		w.WriteHeader(http.StatusBadRequest)
	}
}

//DeleteUser API call that will delete the user with the given username
func DeleteUser(w http.ResponseWriter, r *http.Request) {

}

//ListUsers API call that lists all users described by filter
func ListUsers(w http.ResponseWriter, r *http.Request) {

}

//GetUser API call that gets an user by username
func GetUser(w http.ResponseWriter, r *http.Request) {

}
