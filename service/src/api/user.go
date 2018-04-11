package main

import (
	"fmt"

	"github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

const (
	//AccountTypeStudent Account has not been approved to continue application process
	AccountTypeStudent = 0

	//AccountTypeTeacher Account has been approved to continue application process
	AccountTypeTeacher = 1

	//AccountTypeAdmin Account has administrative privileges
	AccountTypeAdmin = 2
)

//User Structure for storing infomation about a user
type User struct {
	FName    string `db:"fname" json:"fname"`
	LName    string `db:"lname" json:"lname"`
	Type     int    `db:"type" json:"type"`
	Verified bool   `db:"verified" json:"verified"`
	Email    string `db:"email" json:"email"`
	Password string `db:"hash" json:"password"`
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
		err := database.AddUser(user)

		if err != nil {
			switch e := err.(type) {
			case *pq.Error:
				//Database err
				if e.Code == "23505" {
					if e.Constraint == "email_unique" || e.Constraint == "users_pkey" {
						return &ErrAuthUserExists{
							message: fmt.Sprintf("User with email, %s, is already signed up.", user.Email),
						}
					}
				}
			default:
				return err.(error)
			}
		}
	}

	return err
}
