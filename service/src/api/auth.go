package main

import (
	"errors"
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

//UserJWTClaims JWT claims for a user account
type UserJWTClaims struct {
	FName    string `json:"fname"`
	LName    string `json:"lname"`
	Username string `json:"username"`
	Admin    bool   `json:"admin"`
	jwt.StandardClaims
}

//AuthenticateUser Authenticates user login info and returns jwt
func AuthenticateUser(user string, pwd string) (*jwt.Token, error) {
	//Get information about this user
	userinfo, err := database.GetUserInfo(user)

	if err == nil {
		//Verify Password
		if bcrypt.CompareHashAndPassword([]byte(userinfo.Hash), []byte(pwd)) == nil {
			//Create JWT if passwords match
			//Set claims for JWT
			claims := &UserJWTClaims{
				userinfo.FName,
				userinfo.LName,
				userinfo.Username,
				userinfo.Admin,
				jwt.StandardClaims{
					ExpiresAt: time.Now().Add(time.Hour).Unix(),
				},
			}

			//Generate and return JWT
			return jwt.NewWithClaims(jwt.SigningMethodHS256, claims), nil
		}

		//Password was incorrect
		return nil, errors.New("Incorrect Password")
	}

	//Username does not exist
	return nil, err
}
