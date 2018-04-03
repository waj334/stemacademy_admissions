package main

import (
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"strings"

	"github.com/jmoiron/sqlx"
	"github.com/jmoiron/sqlx/reflectx"
	"github.com/lib/pq"
)

//Database Structure for all database interactions
type Database struct {
	db *sqlx.DB
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

//ConnectDB Initialize database structure for connection
func ConnectDB(conf *Configuration) (*Database, error) {
	pwd, err := ReadPasswd(conf.DbPasswdFile)

	if err == nil {
		//TODO Support SSL
		connStr := fmt.Sprintf("user=%s dbname=%s password=%s host=%s sslmode=%s", conf.DbUser, conf.DbName, pwd, conf.DbHost, conf.DbSSLMode)
		db, err := sqlx.Connect("postgres", connStr)

		if err == nil {
			if db != nil {
				db.Mapper = reflectx.NewMapperFunc("db", strings.ToLower)

				d := new(Database)
				d.db = db

				return d, nil
			}
		}
	}

	return nil, err
}

//CreateTables Create needed tables in the proper order
func (db *Database) CreateTables() *pq.Error {
	funcs := []func() *pq.Error{
		db.CreateUserTable,
		db.CreateApplicationTable,
	}

	for i := range funcs {
		err := funcs[i]()

		if err != nil {
			return err
		}
	}

	return nil
}

//CreateApplicationTable Create the applicant table
func (db *Database) CreateApplicationTable() *pq.Error {
	_, err := db.db.Exec(`
		CREATE TABLE IF NOT EXISTS application (
			id					text	not null,
			fname				text	not null,
			lname				text	not null,
			age					integer	not null,
			gender				integer	not null,
			ethnicity			integer	not null,
			citizenship			integer not null,
			phone_no			text,
			email				text	not null,
			contact_fname		text 	not null,
			contact_lname		text 	not null,
			contact_phone_no	text 	not null,
			contact_email		text	not null,
			street				text 	not null,
			state				text 	not null,
			city				text 	not null,
			zip					text 	not null,
			school_name			text 	not null,
			school_phone_no		text	not null,
			school_street		text	not null,
			school_state		text	not null,
			school_city			text	not null,
			school_zip			text	not null,
			school_county		text	not null,
			grade_level			integer not null,
			subject				text,
			group_name			text,
			room				text,
			status				text,
			primary key(id),
			unique(id),
			unique(email)
		)`)

	if err != nil {
		return err.(*pq.Error)
	}

	return nil
}

//CreateUserTable Create the user table
func (db *Database) CreateUserTable() *pq.Error {
	_, err := db.db.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			email		text	not null,
			hash		text	not null,
			type		text	not null,
			primary key(email),
			unique(email),
			unique(hash)
		)`)

	if err != nil {
		return err.(*pq.Error)
	}

	return nil
}

//AddUser Adds new user info to the database
func (db *Database) AddUser(user *User) error {
	_, err := db.db.NamedExec(`INSERT INTO users (email, fname, lname, hash, type)
		VALUES (:email, :fname, :lname, :hash, :type)`, user)

	if err == nil {
		//TODO: Email verification here
		return nil
	}

	pgerr := err.(*pq.Error)

	if pgerr.Code == "23505" {
		if pgerr.Constraint == "email_unique" {
			return &ErrAuthUserExists{
				fmt.Sprintf("User %s exists", user.Email),
			}
		}
	}

	return err
}

//GetUserInfo Gets and return information about an user
func (db *Database) GetUserInfo(user string) (*User, error) {
	//TODO: Enforce password policy here
	u := new(User)
	err := db.db.Get(u, `SELECT * FROM users WHERE email=$1`, user) //Need * for marshalling to work properly

	if err == nil {
		return u, nil
	}

	return nil, errors.New("User does not exist")
}

// InsertApplication Insert new application into database
func (db *Database) InsertApplication(app *Application) error {
	_, err := db.db.NamedExec(`
			INSERT INTO application (
				fname, lname, age, gender, ethnicity, citizenship, phone_no, email, street, city, state, zip,
				contact_fname, contact_lname, contact_phone_no, contact_email, 
				school_name, school_phone_no, school_street, school_city, school_state, school_county, school_zip,
				grade_level, subject, group_name, room, status
			)
			VALUES (
				:fname, :lname, :age, :gender, :ethnicity, :citizenship, :phone_no, :email, :street, :city, :state, :zip,
				:contact_fname, :contact_lname, :contact_phone_no, :contact_email, 
				:school_name, :school_phone_no, :school_street, :school_city, :school_state, :school_county, :school_zip,
				:grade_level, :subject, :group_name, :room, :status
			)
			`, app)

	switch err.(type) {
	case *pq.Error:
		return err.(*pq.Error)
	}

	return err
}

//UpdateApplication Updates a single column from the application database table
func (db *Database) UpdateApplication(id string, column string, val string) *pq.Error {
	_, err := db.db.Exec(`
		UPDATE application
		SET $1=$2
		WHERE id=$3
		`, column, val, id)

	return err.(*pq.Error)
}

//GetApplicationList Gets minimal infomation about all applications in database
func (db *Database) GetApplicationList() ([]ApplicationMinimal, *pq.Error) {
	list := []ApplicationMinimal{}
	err := db.db.Select(&list, "SELECT (fname, lname, email, type, date, id) FROM application")

	return list, err.(*pq.Error)
}

//GetApplication Gets a single application from the database
func (db *Database) GetApplication(id string) (*Application, *pq.Error) {
	app := Application{}
	err := db.db.Get(&app, "SELECT * FROM application WHERE id=$1", id)

	return &app, err.(*pq.Error)
}
