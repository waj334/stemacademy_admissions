package main

import (
	"golang.org/x/crypto/bcrypt"
)

//User Structure for storing infomation about a user
type User struct {
	FName    string `db:"fname" json:"fname"`
	LName    string `db:"lname" json:"lname"`
	Username string `db:"username" json:"username"`
	Admin    bool   `db:"admin" json:"admin"`
	Hash     string `db:"pwd_hash"`
	Email    string `db:"email"`
	Password string `json:"password"`
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
		user.Hash = string(hash)
		err = database.AddUser(user)
	}

	return err
}
