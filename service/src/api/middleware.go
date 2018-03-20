package main

import (
	"net/http"
	"strings"

	"github.com/SermoDigital/jose/crypto"
)

// APIKeyCheckMiddleware Middleware that verifies API key in request header
func APIKeyCheckMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		key := r.Header.Get("APIKey")

		if strings.Compare(key, apiKey) != 0 {
			w.WriteHeader(http.StatusUnauthorized)
		} else {
			next.ServeHTTP(w, r)
		}
	})
}

// JWTCheckMiddleware Middleware that checks and validate authorization header
func JWTCheckMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token, err := DecodeAuthHeader(r)

		if err == nil {
			//Validate claims
			if token.Validate(rsaPub, crypto.SigningMethodRS512) {
				next.ServeHTTP(w, r)
			} else {
				w.WriteHeader(http.StatusUnauthorized)
			}
		} else {
			w.WriteHeader(http.StatusUnauthorized)
		}
	})
}
