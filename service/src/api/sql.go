package main

import (
	"errors"
	"fmt"

	"github.com/jmoiron/sqlx"
	sq "github.com/Masterminds/squirrel"
	"github.com/lib/pq"
)

var errUserInfoConflict = errors.New("Conflicting user data entered")

const (
	//SQLTableAddress SQL Table: 'address'
	SQLTableAddress				= "address"
	//SQLTableAuth SQL Table: 'auth'
	SQLTableAuth				= "auth"
	//SQLTableApplicant SQL Table: 'application'
	SQLTableApplicant			= "applicant"
	//SQLTableApplication SQL Table: 'application'
	SQLTableApplication			= "application"
	//SQLTableApplicationStatus SQL Table: 'application_status'
	SQLTableApplicationStatus	= "application_status"
	//SQLTableCitizenshipType SQL Table: 'citizenship_type'
	SQLTableCitizenshipType		= "citizenship_type"
	//SQLTableContact SQL Table: 'contact'
	SQLTableContact				= "contact"
	//SQLTableContactType SQL Table: 'contact_type'
	SQLTableContactType			= "contact_type"
	//SQLTableCustody SQL Table: 'custody'
	SQLTableCustody				= "custody"
	//SQLTableEntity SQL Table: 'entity'
	SQLTableEntity				= "entity"
	//SQLTableEntityType SQL Table: 'entity_type'
	SQLTableEntityType			= "entity_type"
	//SQLTableEthnicityType SQL Table: 'ethnicity_type'
	SQLTableEthnicityType		= "ethnicity_type"
	//SQLTableGenderType SQL Table: 'gender_type'
	SQLTableGenderType			= "gender_type"
	//SQLTableName SQL Table: 'name'
	SQLTableName				= "name"
	//SQLTableNameType SQL Table: 'name_type'
	SQLTableNameType			= "name_type"
	//SQLTableSession SQL Table: 'session'
	SQLTableSession				= "session"
	//SQLTableStatus SQL Table: 'status'
	SQLTableStatus				= "status"
)

// SQLInterface SQL interface
type SQLInterface interface {
	Open() error
	Close() error

	SQLCreateSequences() *pq.Error

	SQLCreateAddressTable() *pq.Error
	SQLCreateAuthTable() *pq.Error
	SQLCreateApplicantTable() *pq.Error
	SQLCreateApplicationTable() *pq.Error
	SQLCreateApplicationStatusTable() *pq.Error
	SQLCreateCitizenshipTypeTable() *pq.Error
	SQLCreateContactTable() *pq.Error
	SQLCreateContactTypeTable() *pq.Error
	SQLCreateCustodyTable() *pq.Error
	SQLCreateEntityTable() *pq.Error
	SQLCreateEntityTypeTable() *pq.Error
	SQLCreateEthnicityTypeTable() *pq.Error
	SQLCreateGenderTypeTable() *pq.Error
	SQLCreateNameTable() *pq.Error
	SQLCreateNameTypeTable() *pq.Error
	SQLCreateSessionTable() *pq.Error
	SQLCreateStatusTypeTable() *pq.Error
}

// SQL database interaction functions
type SQL struct {
	db *sqlx.DB
}

func openDatabase() (*sqlx.DB, error) {
	conf, err := getConfig()

	if err == nil {
		dbConf := fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=%s", conf.DbUser, conf.DbPassword, conf.DbHost, conf.DbName, conf.DbSSLMode)
		db, err := sqlx.Open("postgres", dbConf)
		return db, err
	}

	return nil, err
}

// SQLCreateAddressTable Create the address table
func (sql *SQL) SQLCreateAddressTable() *pq.Error {
	_, err := sql.db.Query(`create table if not exists address (
		id		text	not null references entity (id),
		address text	not null,
		state	text	not null,
		zip		text 	not null,
		county	text	not null,
		primary key(id)
	)`)

	return err.(*pq.Error)
}

// SQLCreateAuthTable Create the auth table
func (sql *SQL) SQLCreateAuthTable() *pq.Error {
	_, err := sql.db.Query(`create table if not exists auth (
		id			text	not null references entity (id),
		username	text	not null,
		pwd_hash	text	not null,
		pwd_salt	text	not null,
		policy		text	not null,
		primary key(id),
		unique(username),
		unique(pwd_hash)
	)`)

	return err.(*pq.Error)
}

// SQLCreateApplicantTable Create the applicant table
func (sql *SQL) SQLCreateApplicantTable() *pq.Error {
	_, err := sql.db.Query(`create table if not exists applicant (
		id				text	not null references entity (id),
		age				integer	not null,
		gender_id		integer	not null references gender_type (id),
		ethnicity_id	integer	not null references ethnicity_type (id),
		citizenship_id	integer not null references citizenship_type (id),
		school_id		integer not null references entity (id),
		primary key(id)
	)`)

	return err.(*pq.Error)
}

// SQLCreateApplicationTable Create the application table
func (sql *SQL) SQLCreateApplicationTable() *pq.Error {
	_, err := sql.db.Query(`create sequence application_seq`)

	if err == nil {
		_, err = sql.db.Query(`create table if not exists application (
			id				integer	not null nextval('application_seq'),
			applicant_id	text	not null references applicant (id)
			session_id		text	not null references session (id)
			primary key(id),
			unique(id)
		)`)
	}

	return err.(*pq.Error)
}

// SQLCreateApplicationStatusTable Create the application status table
func (sql *SQL) SQLCreateApplicationStatusTable() *pq.Error {
	_, err := sql.db.Query(`create sequence application_status_seq`)

	if err == nil {
		_, err = sql.db.Query(`create table if not exists application_status (
			id				text		not null nextval('application_status_seq'),
			application_id	integer		not null references application (id)
			status_id		integer		not null references status_type (id),
			date			date		not null
			primary key(id),
			unique(id)
		)`)
	}

	return err.(*pq.Error)
}

// SQLCreateCitizenshipTypeTable Create the citizenship type table
func (sql *SQL) SQLCreateCitizenshipTypeTable() *pq.Error {
	_, err := sql.db.Query(`create sequence citizenship_type_seq`)

	if err == nil {
		_, err = sql.db.Query(`create table if not exists citizenship_type (
			id		integer	not null nextval('citizenship_type_seq'),
			type	text 	not null
			primary key(id),
			unique(id)
		)`)
	}

	return err.(*pq.Error)
}

// SQLCreateContactTable Create the contact table
func (sql *SQL) SQLCreateContactTable() *pq.Error {
	_, err := sql.db.Query(`create sequence contact_sequence`)

	if err == nil {
		_, err = sql.db.Query(`create table if not exists contact (
			id			integer		not null nextval('contact_sequence'),
			entity_id	text		not null references entity (id),
			infomation	text		not null,
			type_id		integer		not null references contact_type (id),
			primary key(id),
			unique(id)
		)`)
	}

	return err.(*pq.Error)
}

// SQLCreateContactTypeTable Create the contact type table
func (sql *SQL) SQLCreateContactTypeTable() *pq.Error {
	_, err := sql.db.Query(`create sequence contact_type_seq`)

	if err == nil {
		_, err = sql.db.Query(`create table if not exists contact_type (
			id		integer	not null nextval('contact_type_seq'),
			type	text 	not null
			primary key(id),
			unique(id)
		)`)
	}

	return err.(*pq.Error)
}

// SQLCreateCustodyTable Create the custody table
func (sql *SQL) SQLCreateCustodyTable() *pq.Error {
	_, err := sql.db.Query(`create sequence custody_seq`)

	if err == nil {
		_, err = sql.db.Query(`create table if not exists custody (
			id				integer	not null nextval('custody_seq'),
			applicant_id	text	not null references applicant (id),
			guardian_id		text	not null references entity (id)
			primary key(id),
			unique(id)
		)`)
	}

	return err.(*pq.Error)
}

// SQLCreateEntityTable Create the entity table
func (sql *SQL) SQLCreateEntityTable() *pq.Error {
	_, err := sql.db.Query(`create table if not exists entity (
		id		text	not null,
		type_id integer	not null references entity_type (id),
		primary key(id),
		unique(id)
	)`)

	return err.(*pq.Error)
}

// SQLCreateEntityTypeTable Create the entity type table
func (sql *SQL) SQLCreateEntityTypeTable() *pq.Error {
	_, err := sql.db.Query(`create sequence entity_seq`)

	if err == nil {
		_, err := sql.db.Query(`create table if not exists entity_type (
			id		integer 	not null nextval('entity_seq'),
			type	text		not null,
			primary key(id),
			unique(id)
		)`)
	}

	return err.(*pq.Error)
}

// SQLCreateEthnicityTypeTable Create the ethnicity type table
func (sql *SQL) SQLCreateEthnicityTypeTable() *pq.Error {
	_, err := sql.db.Query(`create sequence ethnicity_seq`)

	if err == nil {
		_, err := sql.db.Query(`create table if not exists ethnicity_type (
			id		integer 	not null nextval('ethnicity_seq'),
			type	text		not null,
			primary key(id),
			unique(id)
		)`)
	}

	return err.(*pq.Error)
}

// SQLCreateGenderTypeTable Create the gender type table
func (sql *SQL) SQLCreateGenderTypeTable() *pq.Error {
	_, err := sql.db.Query(`create sequence gender_seq`)

	if err == nil {
		_, err = sql.db.Query(`create table if not exists gender_type (
			id		integer 	not null nextval('gender_seq'),
			type	text		not null,
			primary key(id),
			unique(id)
		)`)
	}

	return err.(*pq.Error)
}

// SQLCreateNameTable Create the name table
func (sql *SQL) SQLCreateNameTable() *pq.Error {
	_, err := sql.db.Query(`create sequence name_seq`)

	if err == nil {
		_, err = sql.db.Query(`create table if not exists name (
			id			integer		not null nextval(name_seq),
			entity_id	text		not null references entity (id),
			name		text		not null,
			type_id		integer		not null references name_type (id),
			primary key(id),
			unique(id)
		)`)
	}

	return err.(*pq.Error)
}

// SQLCreateNameTypeTable Create the name type table
func (sql *SQL) SQLCreateNameTypeTable() *pq.Error {
	_, err := sql.db.Query(`create sequence name_seq`)

	if err == nil {
		_, err = sql.db.Query(`create table if not exists name_type (
			id		integer 	not null nextval('name_seq'),
			type	text		not null,
			primary key(id),
			unique(id)
		)`)
	}

	return err.(*pq.Error)
}

// SQLCreateSessionTable Create the session table
func (sql *SQL) SQLCreateSessionTable() *pq.Error {
	_, err := sql.db.Query(`create table if not exists session (
		id			integer		not null references entity (id),
		begin_date	date		not null,
		end_date	date		not null,
		primary key(id)
	)`)

	return err.(*pq.Error)
}

// SQLCreateStatusTypeTable Create the status type table
func (sql *SQL) SQLCreateStatusTypeTable() *pq.Error {
	_, err := sql.db.Query(`create sequence status_seq`)

	if err == nil {
		_, err = sql.db.Query(`create table if not exists status_type (
			id		integer 	not null nextval('status_seq'),
			type	text		not null,
			primary key(id),
			unique(id)
		)`)
	}

	return err.(*pq.Error)
}