package main

import (
	"errors"
	"fmt"
	"strings"

	"github.com/jmoiron/sqlx"
	"github.com/jmoiron/sqlx/reflectx"
	"github.com/lib/pq"
)

//Database Structure for all database interactions
type Database struct {
	db *sqlx.DB
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
		db.CreateFileTable,
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
			user_id				text	not null references users(email) ON DELETE CASCADE,
			type				integer not null,
			date				timestamp with time zone not null,
			dob					timestamp with time zone not null,
			gender				integer	not null,
			ethnicity			integer	not null,
			citizenship			integer not null,
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
			subjects				text,
			group_name			text,
			room				text,
			status				text,
			primary key(id),
			unique(id),
			unique(user_id)
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
			type		integer not null,
			verified	boolean not null,
			fname		text	not null,
			lname		text	not null,
			email		text	not null,
			phone_no	text	not null,
			hash		text	not null,
			reset_token text,
			verify_token text,
			primary key(email),
			unique(email),
			unique(hash),
			unique(reset_token),
			unique(verify_token)
		)`)

	if err != nil {
		return err.(*pq.Error)
	}

	return nil
}

//CreateFileTable Create the file table
func (db *Database) CreateFileTable() *pq.Error {
	_, err := db.db.Exec(`
		CREATE TABLE IF NOT EXISTS file (
			id		TEXT NOT NULL,
			appId	TEXT NOT NULL references application(id),
			owner	TEXT NOT NULL references users(email),
			PRIMARY KEY(id),
			UNIQUE(id)
		)`)

	if err != nil {
		return err.(*pq.Error)
	}

	return nil
}

//AddUser Adds new user info to the database
func (db *Database) AddUser(user *User) error {
	_, err := db.db.NamedExec(`INSERT INTO users (email, phone_no, fname, lname, hash, type, verified)
		VALUES (:email, :phone_no, :fname, :lname, :hash, :type, FALSE)`, user)

	if err != nil {
		return err
	}

	return nil
}

//RemoveUser Remove user from database
func (db *Database) RemoveUser(email string) error {
	_, err := db.db.Exec(`DELETE FROM users where email=$1 CASCADE`, email)

	if err != nil {
		return err
	}

	return nil
}

//GetUserInfo Gets and return information about an user
func (db *Database) GetUserInfo(user string) (*User, error) {
	//TODO: Enforce password policy here
	u := new(User)
	err := db.db.Get(u, `SELECT type, verified, email, lname, fname, hash, phone_no FROM users WHERE email=$1`, user) //Need * for marshalling to work properly

	if err == nil {
		return u, nil
	}

	return nil, errors.New("User does not exist")
}

//GetUsers Gets all user of type (Type)
func (db *Database) GetUsers(Type int) ([]User, error) {
	users := []User{}
	var err error

	if Type == -1 {
		err = db.db.Select(&users, `SELECT type, verified, email, lname, fname, hash, phone_no FROM users
			ORDER BY users.lname, users.fname, users.type DESC`)
	} else {
		err = db.db.Select(&users, `SELECT type, verified, email, lname, fname, hash, phone_no FROM users WHERE type=$1
			ORDER BY users.lname, users.fname, users.type DESC`, Type)
	}

	if err != nil {
		return nil, err
	}

	return users, nil
}

//ChangeUserVerifiedStatus Changes user verifiaction status
func (db *Database) ChangeUserVerifiedStatus(user string, approved bool) error {
	_, err := db.db.Exec(
		`UPDATE users
		SET verified = $1
		WHERE
		email=$2`,
		approved, user)

	if err != nil {
		return err.(*pq.Error)
	}

	return nil
}

// InsertApplication Insert new application into database
func (db *Database) InsertApplication(app *Application) error {
	_, err := db.db.NamedExec(`
			INSERT INTO application (
				id, user_id, date, type, age, gender, ethnicity, citizenship, street, city, state, zip,
				contact_fname, contact_lname, contact_phone_no, contact_email, 
				school_name, school_phone_no, school_street, school_city, school_state, school_county, school_zip,
				grade_level, subjects, group_name, room, status
			)
			VALUES (
				:id, :user_id, now(), :type, :age, :gender, :ethnicity, :citizenship, :street, :city, :state, :zip,
				:contact_fname, :contact_lname, :contact_phone_no, :contact_email, 
				:school_name, :school_phone_no, :school_street, :school_city, :school_state, :school_county, :school_zip,
				:grade_level, :subjects, :group_name, :room, :status
			)
			`, app)

	switch err.(type) {
	case *pq.Error:
		return err.(*pq.Error)
	}

	return err
}

//UpdateApplication Updates a single column from the application database table
func (db *Database) UpdateApplication(id string, column string, val string) error {
	_, err := db.db.Exec(fmt.Sprintf(`
		UPDATE application
		SET %s=$1
		WHERE id=$2
		`, column), val, id)

	return err
}

//GetApplicationList Gets minimal infomation about all applications in database
func (db *Database) GetApplicationList() ([]ApplicationMinimal, error) {
	list := []ApplicationMinimal{}
	err := db.db.Select(&list,
		`SELECT users.fname, users.lname, users.email, users.type, application.date, application.id, application.status
		FROM users
		INNER JOIN application ON users.email = application.user_id`)

	if err != nil {
		return nil, err
	}

	return list, nil
}

//GetApplication Gets a single application from the database
func (db *Database) GetApplication(id string) (*Application, error) {
	app := Application{}
	err := db.db.Get(&app, "SELECT * FROM application WHERE id=$1", id)

	if err != nil {
		return nil, err
	}

	return &app, nil
}

//InsertFile Create a database record for an uploaded file
func (db *Database) InsertFile(owner string, appID string, id string) error {
	_, err := db.db.Exec(
		`INSERT INTO file (id, appId, owner)
		VALUES ($1, $2, $3)
		`, id, appID, owner)

	return err
}

//GetRoster Gets room assignments for applicants
func (db *Database) GetRoster() ([]RosterEntry, error) {
	list := []RosterEntry{}
	err := db.db.Select(&list,
		`SELECT users.fname, users.lname, users.email, users.type, application.id, application.room, application.group_name
		FROM users
		INNER JOIN application ON users.email = application.user_id
		WHERE application.status='accepted'
		ORDER BY users.lname, users.fname ASC`)

	if err != nil {
		return nil, err
	}

	return list, nil
}

//UpdateVerifyToken Updates token used for email verification
func (db *Database) UpdateVerifyToken(email string, token string) error {
	_, err := db.db.Exec(`UPDATE users 
		SET verify_token=$1
		WHERE email=$2`, token, email)

	return err
}

//UpdateResetToken Updates token used for password reset
func (db *Database) UpdateResetToken(email string, token string) error {
	_, err := db.db.Exec(`UPDATE users 
		SET reset_token=$1
		WHERE email=$2`, token, email)

	return err
}

//UpdateVerificationByToken Changes verification status to true if token exists in database
func (db *Database) UpdateVerificationByToken(token string) error {
	r, err := db.db.Exec(`UPDATE users
		SET verified=TRUE,
		    verify_token=''
		WHERE verify_token=$1`, token)

	rowsAffected, err := r.RowsAffected()

	if rowsAffected == 0 {
		return &ErrTokenNotAssociated{
			message: "No associated user",
		}
	}

	return err
}

//UpdatePasswordByToken Changes password if token exists in database
func (db *Database) UpdatePasswordByToken(token string, hash string) error {
	r, err := db.db.Exec(`UPDATE users
		SET hash=$1,
		    reset_token=''
		WHERE reset_token=$2`, hash, token)

	rowsAffected, err := r.RowsAffected()

	if rowsAffected == 0 {
		return &ErrTokenNotAssociated{
			message: "No associated user",
		}
	}

	return err
}
