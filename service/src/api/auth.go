package main

import (
	"io/ioutil"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

//UserJWTClaims JWT claims for a user account
type UserJWTClaims struct {
	Email       string `json:"email"`
	AccountType int    `json:"type"`
	Approved    bool   `json:"approved"`
	jwt.StandardClaims
}

//AuthenticateUser Authenticates user login info and returns jwt
func AuthenticateUser(user string, pwd string) (*jwt.Token, int, error) {
	//Get information about this user
	userinfo, err := database.GetUserInfo(user)

	if err == nil {
		//Verify Password
		if bcrypt.CompareHashAndPassword([]byte(userinfo.Password), []byte(pwd)) == nil {
			//Check if user has been verified
			if !userinfo.Verified {
				return nil, -1, &ErrAuthUserNotVerified{
					"User has not been verfied",
				}
			}

			//Create JWT if passwords match
			claims := &UserJWTClaims{
				userinfo.Email,
				userinfo.Type,
				userinfo.Verified,
				jwt.StandardClaims{
					ExpiresAt: time.Now().Add(time.Hour).Unix(),
				},
			}

			//Generate and return JWT
			return jwt.NewWithClaims(jwt.SigningMethodHS256, claims), userinfo.Type, nil
		}

		//Password was incorrect
		return nil, -1, &ErrAuthInvalidPassword{
			"Invalid Login. Check your username/password and try again.",
		}
	}

	//Username does not exist
	return nil, -1, err
}

//ReadPasswd Read the password file
func ReadPasswd(path string) (string, error) {
	file, err := os.Open(path)

	if err != nil {
		return "", err
	}

	defer file.Close()

	bytes, _ := ioutil.ReadAll(file)
	return string(bytes), nil
}
