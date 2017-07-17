package main

import (
	"github.com/rs/xid"
)

//GenerateGUID Generates a random GUID
func GenerateGUID() string {
	guid := xid.New()
	return guid.String()
}
