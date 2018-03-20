package main

import (
	"log"
	"net/http"

	"github.com/lib/pq"
)

//User struct holding details about an user
type User struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Type      string `json:"type"`
}

//CreateUser create a new user
func CreateUser(user *User) error {
	var err error

	//Hash password
	hash, salt := GenPasswordHash(user.Password)

	//Attemp insertion into database
	err = sql.SQLCreateUser(user.Email, user.FirstName, user.LastName, hash, salt, user.Type)

	if err != nil {
		log.Print(err)

		//Convert pq error
		pqerr := err.(*pq.Error)

		//User already exists
		if pqerr.Code.Name() == "unique_violation" {
			err = NewErrCreateUserExists("User already exists")
		}

		return err
	}

	return nil
}

//DeleteUser delete the user with the given username
func DeleteUser(w http.ResponseWriter, r *http.Request) {

}

//ListUsers lists all users described by filter
func ListUsers(w http.ResponseWriter, r *http.Request) {

}

//GetUser gets an user by username
func GetUser(w http.ResponseWriter, r *http.Request) {

}
