package main

import (
	"golang.org/x/crypto/bcrypt"
)

//User Structure for storing infomation about a user
type User struct {
	Admin    bool   `db:"admin" json:"admin"`
	Password string `db:"pwd"`
	Email    string `db:"email"`
}

//UserAuth Structure for holding user authentication info from client
type UserAuth struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

//CreateUser Adds a new user to the database
func CreateUser(user *User, pwd string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), 10)

	if err == nil {
		user.Password = string(hash)
		err = database.AddUser(user)
	}

	return err
}
