package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func setupAPI() *mux.Router {
	fmt.Println("Setting up the API")

	router := newRouter()

	fmt.Println("Setup Complete")

	return router
}

/////////////////////////////////////////////////////////////////
/// User Authentication API Functions
/////////////////////////////////////////////////////////////////

// APICreateUser API call to create a new user
func APICreateUser(w http.ResponseWriter, r *http.Request) {
	newUser := new(User)
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&newUser)

	if err == nil {
		err := CreateUser(newUser)

		if err == nil {
			w.WriteHeader(http.StatusAccepted)
		} else {
			w.WriteHeader(http.StatusConflict)
		}
	} else {
		w.WriteHeader(http.StatusBadRequest)
	}
}

// APIUserLogin API call to authenticate user and reply with JWT if successful
func APIUserLogin(w http.ResponseWriter, r *http.Request) {
	info := new(LoginInfo)

	//Decode request body
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&info)

	//Authenticate user and generate JWT
	token, err := AuthUser(info)

	if err == nil {
		//Write response containing token
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusAccepted)
		w.Write([]byte("{\"token\": \"" + string(token) + "\"}"))
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(err.Error()))
	}
}

// APIUserLogout API call to destroy user session
func APIUserLogout(w http.ResponseWriter, r *http.Request) {
}

//////////////////////////////////////////////////////////////////////////
/// Student API Functions
//////////////////////////////////////////////////////////////////////////

// APIApplicationSubmitStudent API call to process student application data
func APIApplicationSubmitStudent(w http.ResponseWriter, r *http.Request) {
	container := new(StudentPayloadContainer)
	var payload StudentPayload

	//Decode request body
	decoder := json.NewDecoder(r.Body)
	derr := decoder.Decode(&container)

	if derr == nil {
		payload = container.Application
	} else {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Application format incorrect"))
		return
	}

	//Process application data
	err := SubmitStudentApplication(&payload)

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.WriteHeader(http.StatusOK)
}
