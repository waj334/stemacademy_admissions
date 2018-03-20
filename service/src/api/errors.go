package main

///////////////////////////////////
/// Authentication Errors
///////////////////////////////////

// ErrAuthInvalidPassword Incorrect password provided during user authentication
type ErrAuthInvalidPassword struct {
	message string
}

// NewErrAuthInvalidPassword Creates a new invalid password error
func NewErrAuthInvalidPassword(message string) *ErrAuthInvalidPassword {
	return &ErrAuthInvalidPassword{
		message: message,
	}
}

func (e *ErrAuthInvalidPassword) Error() string {
	return e.message
}

// ErrAuthUserNotFound User is not present in the database
type ErrAuthUserNotFound struct {
	message string
}

// NewErrAuthUserNotFound Creates new user not found error
func NewErrAuthUserNotFound(message string) *ErrAuthUserNotFound {
	return &ErrAuthUserNotFound{
		message: message,
	}
}

func (e *ErrAuthUserNotFound) Error() string {
	return e.message
}

// ErrAuthInvalidHeader Request authorization header was invalid
type ErrAuthInvalidHeader struct {
	message string
}

//NewErrAuthInvalidHeader Create new invalid authorization header error
func NewErrAuthInvalidHeader(message string) *ErrAuthInvalidHeader {
	return &ErrAuthInvalidHeader{
		message: message,
	}
}

func (e *ErrAuthInvalidHeader) Error() string {
	return e.message
}

///////////////////////////////////
/// Application Data Errors
///////////////////////////////////

// ErrApplicationDataInvalid the application data was incorrect format
type ErrApplicationDataInvalid struct {
	message string
}

// NewErrApplicationDataInvalid create new application data invalid error
func NewErrApplicationDataInvalid(message string) *ErrApplicationDataInvalid {
	return &ErrApplicationDataInvalid{
		message: message,
	}
}

func (e *ErrApplicationDataInvalid) Error() string {
	return e.message
}

////////////////////////////////////
/// Creation Errors
////////////////////////////////////

// ErrCreateUserExists User already exists in database
type ErrCreateUserExists struct {
	message string
}

// NewErrCreateUserExists create a new user exists error
func NewErrCreateUserExists(message string) *ErrCreateUserExists {
	return &ErrCreateUserExists{
		message: message,
	}
}

func (e *ErrCreateUserExists) Error() string {
	return e.message
}
