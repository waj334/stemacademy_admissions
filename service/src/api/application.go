package main

import (
	"time"
)

//Application struct holding Application info
type Application struct {
	ID               string    `json:"id" db:"id"`
	ApplicationType  string    `json:"type" db:"type"`
	Date             time.Time `json:"date" db:"date"`
	Email            string    `json:"email" db:"user_id"`
	DOB              time.Time `json:"dob" db:"dob"`
	Gender           int       `json:"gender" db:"gender"`
	Ethnicity        int       `json:"ethnicity" db:"ethnicity"`
	Citizenship      int       `json:"citizenship" db:"citizenship"`
	Street           string    `json:"street" db:"street"`
	City             string    `json:"city" db:"city"`
	State            string    `json:"state" db:"state"`
	Zip              string    `json:"zip" db:"zip"`
	ContactFirstname string    `json:"contact_fname" db:"contact_fname"`
	ContactLastname  string    `json:"contact_lname" db:"contact_lname"`
	ContactPhoneNo   string    `json:"contact_phone_no" db:"contact_phone_no"`
	ContactEmail     string    `json:"contact_email" db:"contact_email"`
	SchoolName       string    `json:"school_name" db:"school_name"`
	SchoolPhoneNo    string    `json:"school_phone_no" db:"school_phone_no"`
	SchoolStreet     string    `json:"school_street" db:"school_street"`
	SchoolCity       string    `json:"school_city" db:"school_city"`
	SchoolState      string    `json:"school_state" db:"school_state"`
	SchoolCounty     string    `json:"school_county" db:"school_county"`
	SchoolZip        string    `json:"school_zip" db:"school_zip"`
	GradeLevel       int       `json:"grade_level" db:"grade_level"`
	Subject          string    `json:"subjects" db:"subjects"`
	GroupName        string    `json:"group_name" db:"group_name"`
	Room             string    `json:"room" db:"room"`
	Status           string    `json:"status" db:"status"`
}

//ApplicationMinimal Structure used for headers
type ApplicationMinimal struct {
	ID              string    `json:"id" db:"id"`
	FName           string    `json:"fname" db:"fname"`
	LName           string    `json:"lname" db:"lname"`
	Email           string    `json:"email" db:"email"`
	ApplicationType int       `json:"type" db:"type"`
	Date            time.Time `json:"date" db:"date"`
	Status          string    `json:"status" db:"status"`
}

//RosterEntry Structure used for roster
type RosterEntry struct {
	ID              string `json:"id" db:"id"`
	FName           string `json:"fname" db:"fname"`
	LName           string `json:"lname" db:"lname"`
	Email           string `json:"email" db:"email"`
	ApplicationType int    `json:"type" db:"type"`
	GroupName       string `json:"group_name" db:"group_name"`
	Room            string `json:"room" db:"room"`
}

//UpdateStatus Updates the application status
func (app *Application) UpdateStatus(status string) {
	app.Status = status
	database.UpdateApplication(app.ID, "status", status)
}

//UpdateRoom Updates the room for this applicant
func (app *Application) UpdateRoom(room string) {
	app.Room = room
	database.UpdateApplication(app.ID, "room", room)
}

//UpdateGroup Updates the group this applicant will belong to
func (app *Application) UpdateGroup(group string) {
	app.GroupName = group
	database.UpdateApplication(app.ID, "group_name", group)
}

//Process Inserts application information into database
func (app *Application) Process() error {
	err := database.InsertApplication(app)

	return err
}
