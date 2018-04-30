package main

// ErrAuthInvalidPassword Incorrect password provided during user authentication
type ErrAuthInvalidPassword struct {
	message string
}

func (e *ErrAuthInvalidPassword) Error() string {
	return e.message
}

// ErrAuthUserNotFound User is not present in the database
type ErrAuthUserNotFound struct {
	message string
}

func (e *ErrAuthUserNotFound) Error() string {
	return e.message
}

// ErrAuthUserExists User is not present in the database
type ErrAuthUserExists struct {
	message string
}

func (e *ErrAuthUserExists) Error() string {
	return e.message
}

// ErrAuthUserNotVerified User is not present in the database
type ErrAuthUserNotVerified struct {
	message string
}

func (e *ErrAuthUserNotVerified) Error() string {
	return e.message
}

// ErrTokenNotAssociated Token is not associated with any user
type ErrTokenNotAssociated struct {
	message string
}

func (e *ErrTokenNotAssociated) Error() string {
	return e.message
}

// ErrDatabaseConnectErr Token is not associated with any user
type ErrDatabaseConnectErr struct {
	message string
}

func (e *ErrDatabaseConnectErr) Error() string {
	return e.message
}
