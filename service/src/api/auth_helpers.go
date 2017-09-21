package main

import (
	"crypto/rand"
	"crypto/sha512"
	"encoding/hex"
)

func genPasswordHash(pwd string) (hash string, salt string) {
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

func hashPasswordInput(pwd string, salt string) string {
	hasher := sha512.New()
	hasher.Write([]byte(pwd + salt))
	inputHash := hex.EncodeToString(hasher.Sum(nil))

	return inputHash
}
