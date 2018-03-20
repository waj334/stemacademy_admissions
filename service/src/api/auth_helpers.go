package main

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha512"
	"crypto/x509"
	"encoding/hex"
	"encoding/pem"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/SermoDigital/jose/jws"
	"github.com/SermoDigital/jose/jwt"
)

var (
	rsaPriv *rsa.PrivateKey
	rsaPub  *rsa.PublicKey
)

// DecodePem Decodes pem file
func DecodePem(pFile string) (*pem.Block, error) {
	bytes, err := ioutil.ReadFile(pFile)

	if err == nil {
		block, _ := pem.Decode(bytes)

		return block, nil
	}

	return nil, err
}

//LoadRSAKeys Loads RSA keys into memory
func LoadRSAKeys() error {
	conf, err := getConfig()

	if err == nil {
		//Private Key
		block, err := DecodePem(conf.PrivateKey)

		if err == nil {
			rsaPriv, err := x509.ParsePKCS1PrivateKey(block.Bytes)
		} else {
			return err
		}

		//Public Key
		block, err = DecodePem(conf.PrivateKey + ".pub")

		if err == nil {
			rsaPub, err := x509.ParsePKIXPublicKey(block.Bytes)
		} else {
			return err
		}
	}

	return nil
}

// DecodeAuthHeader Decodes the auth header and return JWT
func DecodeAuthHeader(request *http.Request) (jwt.JWT, error) {
	authStr := request.Header.Get("Authorization")

	if len(authStr) > 0 {
		//Parse authorization header
		authHeader := strings.Split(authStr, " ")

		//Check Bearer
		if strings.Compare(authHeader[0], "Bearer") == 0 {
			//Return JWT
			return jws.ParseJWT([]byte(authHeader[1]))
		}

		return nil, NewErrAuthInvalidHeader("Authorization header format invalid")
	}

	return nil, NewErrAuthInvalidHeader("Authorization header not present")
}

// GenPasswordHash Generates a password hash and random salt string
func GenPasswordHash(pwd string) (hash string, salt string) {
	hasher := sha512.New()
	s := make([]byte, 8)
	_, err := rand.Read(s)

	if err != nil {
		return "", ""
	}

	saltStr := string(s)
	hasher.Write([]byte(pwd + saltStr))
	inputHash := hex.EncodeToString(hasher.Sum(nil))

	return inputHash, saltStr
}

// HashPasswordInput Returns resulting hash of password and salt
func HashPasswordInput(pwd string, salt string) string {
	hasher := sha512.New()
	hasher.Write([]byte(pwd + salt))
	inputHash := hex.EncodeToString(hasher.Sum(nil))

	return inputHash
}
