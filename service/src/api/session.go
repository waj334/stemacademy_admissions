package main

import (
	"crypto/rand"
	"encoding/base64"
	"time"

	"encoding/json"

	"errors"

	"github.com/bradfitz/gomemcache/memcache"
)

//Session holds session information required for most API calls
type Session struct {
	ID     string    `json:"session_id"`
	Owner  string    `json:"user"`
	Expire time.Time `json:"expire"`
}

//GenSessionID generates the random session identification string
func GenSessionID() (string, error) {
	c := 64
	b := make([]byte, c)
	_, err := rand.Read(b)

	return base64.URLEncoding.EncodeToString(b), err

}

//GenSession generates the session object for the specified user
func GenSession(user string) *Session {
	us := new(Session)
	us.Expire = time.Now().Local()
	us.Expire.Add(time.Hour)
	us.Owner = user

	conf, err := getConfig()

	if err != nil {
		return nil
	}

	//Generate Unique Session ID
	id, err := GenSessionID()

	if err == nil {
		us.ID = id
		client := memcache.New(conf.AddrMemcached)

		usJSON, _ := json.Marshal(us)

		client.Set(&memcache.Item{Key: us.ID, Value: []byte(usJSON), Expiration: int32(time.Hour.Seconds())})
	} else {
		return nil
	}

	return us
}

//CheckSession checks memcache for validity of the specified session by ID
func CheckSession(ID string) error {
	conf, err := getConfig()

	if err != nil {
		return errors.New("Config Error")
	}

	client := memcache.New(conf.AddrMemcached)

	usJSON, err := client.Get(ID)

	if err == nil {
		var us Session
		err := json.Unmarshal(usJSON.Value, us)

		if err == nil {
			if us.Expire.Before(time.Now()) {
				return errors.New("Session timed out")
			}
		}
	}

	return err
}

//DestroySession destroy the session belonging to id
func DestroySession(ID string) error {
	conf, err := getConfig()

	if err != nil {
		return errors.New("Config Error")
	}

	client := memcache.New(conf.AddrMemcached)
	return client.Delete(ID)
}
