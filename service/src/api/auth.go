package main

import (
	"strings"
	"time"

	"github.com/SermoDigital/jose/crypto"
	"github.com/SermoDigital/jose/jws"
)

//LoginInfo struct holding login credential payload
type LoginInfo struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

//AuthUser Authorizes a user returning session token
func AuthUser(info *LoginInfo) ([]byte, error) {
	//Retrieve user login info from database
	pwdHash, salt, err := sql.SQLGetUserPasswordHash(info.Email)

	if err == nil {
		//Hash incoming login info
		hash := HashPasswordInput(info.Password, salt)

		if strings.Compare(pwdHash, hash) == 0 {
			//Create JWS claims
			claims := jws.Claims{}
			claims.SetExpiration(time.Now().Add(time.Hour))
			//claims.SetAudience(config.JwtIssuer...)
			claims.Set("User", info.Email)

			//Generate JWT for this user
			token := jws.NewJWT(claims, crypto.SigningMethodRS512)
			sToken, _ := token.Serialize([]byte("abcdef"))

			return sToken, nil
		}

		//Invalid password
		return nil, NewErrAuthInvalidPassword("Invalid Password")
	}

	//User not present in database
	return nil, NewErrAuthUserNotFound("User does not exist")
}

//Signout user signout and destroys session
func Signout(sessionID string) {
	DestroySession(sessionID)
}
