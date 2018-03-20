package main

import (
	"errors"
	"fmt"

	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"

	sq "github.com/Masterminds/squirrel"
)

var errUserInfoConflict = errors.New("Conflicting user data entered")

const (
	//SQLTableAuth SQL Table: 'auth'
	SQLTableAuth = "auth"
	//SQLTableApplicant SQL Table: 'application'
	SQLTableApplicant = "applicant"
	//SQLTableApplication SQL Table: 'application'
	SQLTableApplication = "application"
	//SQLTableSchool SQL Table: 'address'
	SQLTableSchool = "school"
)

// SQLInterface SQL interface
type SQLInterface interface {
	Open() error
	Close() error

	SQLCreateApplicantTable() *pq.Error
	SQLCreateApplicationTable() *pq.Error
	SQLCreateUserTable() *pq.Error
	SQLCreateSchoolTable() *pq.Error
}

// SQL database interaction functions
type SQL struct {
	db *sqlx.DB
}

// NewSQL Create new SQL Wrapper object
func NewSQL() *SQL {
	return new(SQL)
}

// Open open connection to database
func (sql *SQL) Open() error {
	conf, err := getConfig()

	if err == nil {
		dbConf := fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=%s", conf.DbUser, conf.DbPassword, conf.DbHost, conf.DbName, conf.DbSSLMode)
		db, err := sqlx.Open("postgres", dbConf)
	}

	return err
}

// Close Close the database connection
func (sql *SQL) Close() {
	sql.db.Close()
}

// SQLCreateTables Create needed tables in the proper order
func (sql *SQL) SQLCreateTables() *pq.Error {
	funcs := []func() *pq.Error{
		sql.SQLCreateUserTable,
		sql.SQLCreateSchoolTable,
		sql.SQLCreateApplicantTable,
		sql.SQLCreateApplicationTable,
	}

	for i := range funcs {
		err := funcs[i]()

		if err != nil {
			return err
		}
	}

	return nil
}

// SQLCreateApplicantTable Create the applicant table
func (sql *SQL) SQLCreateApplicantTable() *pq.Error {
	_, err := sql.db.Query(`create table if not exists applicant (
		id					text	not null references auth (email),
		age					integer	not null,
		gender_type			integer	not null,
		ethnicity_type		integer	not null,
		citizenship_type	integer not null,
		phone_no			text	not null,
		school_name			text 	not null references school (name),
		contact_first_name	text 	not null,
		contact_last_name	text 	not null,
		contact_phone_no	text 	not null,
		address				text 	not null,
		state				text 	not null,
		city				text 	not null,
		zip					text 	not null,
		grade_level			integer not null,
		subject				text	not null,
		group				text,
		room				text,
		primary key(id),
		unique(id)
	)`)

	return err.(*pq.Error)
}

// SQLCreateApplicationTable Create the application table
func (sql *SQL) SQLCreateApplicationTable() *pq.Error {
	_, err := sql.db.Query(`create sequence application_seq`)

	if err == nil {
		_, err = sql.db.Query(`create table if not exists application (
			id				integer	not null default nextval('application_seq'),
			status			integer,
			applicant_id	text	not null references applicant (id)
			session_id		text	not null
			primary key(id),
			unique(id)
		)`)
	}

	return err.(*pq.Error)
}

// SQLCreateUserTable Create the user table
func (sql *SQL) SQLCreateUserTable() *pq.Error {
	_, err := sql.db.Query(`create table if not exists user (
		email		text	not null,
		first_name	text	not null,
		last_name	text	not null,
		pwd_hash	text	not null,
		pwd_salt	text	not null,
		type		text	not null,
		primary key(id),
		unique(username),
		unique(pwd_hash)
	)`)

	return err.(*pq.Error)
}

// SQLCreateSchoolTable Create the school table
func (sql *SQL) SQLCreateSchoolTable() *pq.Error {
	_, err := sql.db.Query(`create table if not exists school (
		name		text		not null,
		address		text		not null,
		state		text		not null,
		city		text		not null,
		zip			text		not null,
		county		text		not null,
		primary key(name),
		unique(name)
		)`)

	return err.(*pq.Error)
}

////////////////////////////////////////////////////////////////////////////
/// User Account Functions
////////////////////////////////////////////////////////////////////////////

// SQLCreateUser Create a database record for a new user
func (sql *SQL) SQLCreateUser(email string, firstname string, lastname string, pwdhash string, pwdsalt string, usertype string) *pq.Error {
	query := sq.Insert(SQLTableAuth).Columns("email", "pwd_hash", "pwd_salt", "type").
		Values(email, firstname, lastname, pwdhash, pwdsalt, usertype).
		RunWith(sql.db)

	_, err := query.Exec()
	return err.(*pq.Error)
}

// SQLGetUserPasswordHash Get the password hash from database
func (sql *SQL) SQLGetUserPasswordHash(email string) (string, string, *pq.Error) {
	pwd, salt := "", ""

	query := sq.Select("pwd_hash", "pwd_salt").
		From(SQLTableAuth).
		Where("email =?", email).
		RunWith(sql.db).
		PlaceholderFormat(sq.Dollar)

	rows, err := query.Query()

	if err != nil {
		//User does not exist in database
		return "", "", err.(*pq.Error)
	}

	defer rows.Close()
	rows.Next()

	rows.Scan(&pwd, &salt)

	return pwd, salt, nil
}

////////////////////////////////////////////////////////////
/// School Functions
////////////////////////////////////////////////////////////

// SQLInsertSchool Insert new school into database. Returns error if already exists
func (sql *SQL) SQLInsertSchool(school *School) *pq.Error {
	query := sq.Insert(SQLTableSchool).
		Columns("name", "address", "state", "zip", "county").
		Values(school.Name, school.Address, school.State, school.Zip, school.County).
		RunWith(sql.db)

	_, err := query.Exec()
	return err.(*pq.Error)
}

// SQLGetSchoolByAddr Get school from database by address
func (sql *SQL) SQLGetSchoolByAddr(address string, zip string) (*School, *pq.Error) {
	query := sq.Select("*").
		From(SQLTableSchool).
		Where(sq.Eq{"address": address, "zip": zip}).
		RunWith(sql.db)

	//Execute query
	rows, err := query.Query()

	if err == nil {
		defer rows.Close()
		rows.Next()

		var _name, _address, _city, _state, _zip, _county string
		rows.Scan(&_name, &_address, &_city, &_state, &_zip, &_county)

		return NewSchool(_name, _address, _city, _state, _zip, _county), nil
	}

	return nil, err.(*pq.Error)
}

////////////////////////////////////////////////////////////////
/// Applicant Functions
////////////////////////////////////////////////////////////////

// SQLInsertApplicant Insert new student into database
func (sql *SQL) SQLInsertApplicant(applicant *Applicant) *pq.Error {
	query := sq.Insert(SQLTableApplicant).
		Columns("id", "age", "gender_type", "ethnicity_type", "citizenship_type",
			"phone_no", "school_name", "contact_first_name", "contact_last_name",
			"contact_phone_no", "address", "state", "zip", "grade_level",
			"subject", "group", "room").
		Values(applicant.ID, applicant.Age, applicant.Gender, applicant.Eth,
			applicant.Citizenship, applicant.SchoolName, applicant.PhoneNo,
			applicant.ContactFirstname, applicant.ContactLastname,
			applicant.ContactPhoneNo, applicant.Address, applicant.City,
			applicant.State, applicant.Zip, applicant.Grade, applicant.Subject,
			applicant.Group, applicant.Room,
		).
		RunWith(sql.db)

	_, err := query.Exec()
	return err.(*pq.Error)
}

////////////////////////////////////////////////////////////////
/// Application Functions
////////////////////////////////////////////////////////////////

//SQLGetApplicationData Get all application data from database
func (sql *SQL) SQLGetApplicationData(session string) []Application {
	query := sq.Select("*").
		From(SQLTableApplication).
		Where(sq.Eq{"session_name": session}).
		Join(fmt.Sprintf("%s on %s.%s = %s.%s", 
			SQLTableApplicant, "applicant_id",
			SQLTableApplication, "id"))

	
}
