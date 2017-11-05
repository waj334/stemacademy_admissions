package main

import (
	"errors"
	"fmt"

	"github.com/jmoiron/sqlx"

	"github.com/lib/pq"
)

var errUserInfoConflict = errors.New("Conflicting user data entered")

func openDatabase() (*sqlx.DB, error) {
	conf, err := getConfig()

	if err == nil {
		dbConf := fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=%s", conf.DbUser, conf.DbPassword, conf.DbHost, conf.DbName, conf.DbSSLMode)
		db, err := sqlx.Open("postgres", dbConf)
		return db, err
	}

	return nil, err
}

func SQLCreateTables() error {
	db, err := openDatabase()

	if err == nil {
		defer db.Close()

		//Users table
		_, err = db.Query(`create table if not exists users (
			firstname text not null,
			lastname text not null,
			email text not null,
			pwd_hash text not null,
			pwd_salt text not null,
			unique(email),
			primary key(email)
		)`)

		//School table
		_, err = db.Query(`create table if not exists school (
			id text not null,
			name text not null,
			county text not null,
			address text not null,
			state text not null,
			city text not null,
			zip text not null,
			unique(id),
			unique(address,zip),
			primary key(id)
		)`)

		//Student table
		_, err = db.Query(`create table if not exists student (
			id text not null,
			firstname text not null,
			lastname text not null,
			age integer not null,
			eth_race integer not null,
			citizenship integer not null,
			email text not null,
			phone_no text not null,
			address text not null,
			state text not null,
			city text not null,
			zip text not null,
			school_id text not null references school (id),
			unique(email),
			unique(id),
			primary key(id)
		)`)

		//Guardian table
		_, err = db.Query(`create table if not exists guardian (
			student_id text not null references student (id) on delete cascade,
			firstname text not null,
			lastname text not null,
			phone_no text not null,
			email text not null
		)`)
	}

	return err
}

func SQLGetUserPasswordHash(user *LoginInfo) (string, string, error) {
	//Open databse connection and close after function returns
	db, err := openDatabase()
	defer db.Close()

	pwd, salt := "", ""

	if err == nil {
		rows, err := db.Query(`select pwd_hash, pwd_salt from users where email=$1`, user.Username)
		if err != nil {
			//User does not exist in database
			return "", "", err
		}

		defer rows.Close()
		rows.Next()

		rows.Scan(&pwd, &salt)
	}

	return pwd, salt, nil
}

func SQLRegisterNewUser(user *User) error {
	//Open databse connection and close after function returns
	db, err := openDatabase()
	defer db.Close()

	if err == nil {
		rows, err := db.Query(`select create_user($1,$2,$3,$4,$5)`, user.Credentials.Username, user.FirstName, user.LastName, user.Email, user.Credentials.Password)
		if err == nil {
			defer rows.Close()
			rows.Next()

			var result bool
			rows.Scan(&result)

			if result == false {
				return errUserInfoConflict
			}
		} else {
			return err
		}
	}

	return err
}

//School database actions

func SQLInsertSchool(school *SchoolDB) *pq.Error {
	//Open databse connection and close after function returns
	db, err := openDatabase()
	defer db.Close()

	if err == nil {
		_, err = db.NamedExec(
			`insert into school (id,name,county,address,city,state,zip) 
			values (:id,:name,:county,:address,:city,:state,:zip)`, school)

		if err != nil {
			return err.(*pq.Error)
		}
	} else {
		return err.(*pq.Error)
	}

	return nil
}

func SQLGetSchoolByAddr(addr string, zip string) (*SchoolDB, *pq.Error) {
	//Open databse connection and close after function returns
	db, err := openDatabase()
	defer db.Close()

	if err == nil {
		school := new(SchoolDB)
		err = db.Get(school, `select * from school where address=$1 and zip=$2`,
			addr,
			zip,
		)

		if err == nil {
			return school, nil
		}
	}

	return nil, err.(*pq.Error)
}

//Student database actions

func SQLInsertStudent(student *StudentDB) *pq.Error {
	//Open databse connection and close after function returns
	db, err := openDatabase()
	defer db.Close()

	if err == nil {
		_, err = db.NamedExec(
			`insert into student (id,firstname,lastname,age,eth_race,citizenship,email,phone_no,address,city,state,zip,school_id) 
			values (:id,:firstname,:lastname,:age,:eth_race,:citizenship,:email,:phone_no,:address,:city,:state,:zip,:school_id)`, student)

		if err != nil {
			return err.(*pq.Error)
		}
	} else {
		return err.(*pq.Error)
	}

	return nil
}

//Guardian database actions

func SQLInsertGuardian(guardian *GuardianDB) *pq.Error {
	//Open databse connection and close after function returns
	db, err := openDatabase()
	defer db.Close()

	if err == nil {
		_, err = db.NamedExec(
			`insert into guardian (student_id,firstname,lastname,email,phone_no) 
			values (:student_id,:firstname,:lastname,:email,:phone_no)`, guardian)

		if err != nil {
			return err.(*pq.Error)
		}
	} else {
		return err.(*pq.Error)
	}

	return nil
}
