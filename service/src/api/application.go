package main

//Application struct holding Application info
type Application struct {
	ID               string `json:"id" db:"id"`
	Age              int    `json:"age" db:"age"`
	Gender           int    `json:"gender" db:"gender"`
	Eth              int    `json:"eth_race" db:"eth_race"`
	Citizenship      int    `json:"citizenship" db:"citizenship"`
	PhoneNo          string `json:"phone_no" db:"phone_no"`
	Street           string `json:"Street" db:"street"`
	City             string `json:"city" db:"city"`
	State            string `json:"state" db:"state"`
	Zip              string `json:"zip" db:"zip"`
	ContactFirstname string `json:"contact_firstname" db:"contact_firstname"`
	ContactLastname  string `json:"contact_lastname" db:"contact_lastname"`
	ContactPhoneNo   string `json:"contact_phone_no" db:"contact_phone_no"`
	SchoolName       string `json:"school_name" db:"school_name"`
	SchoolStreet     string `json:"school_street" db:"school_street"`
	SchoolCity       string `json:"school_city" db:"school_city"`
	SchoolState      string `json:"school_state" db:"school_state"`
	SchoolCounty     string `json:"school_county" db:"school_county"`
	SchoolZip        string `json:"school_zip" db:"school_zip"`
	GradeLevel       int    `json:"grade_level" db:"grade_level"`
	Subject          string `json:"subject" db:"subject"`
	Group            string `json:"group" db:"group"`
	Room             string `json:"room" db:"room"`
	Status           string `json:"status" db:"status"`
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
	app.Group = group
	database.UpdateApplication(app.ID, "group", group)
}

//Process Inserts application information into database
func (app *Application) Process() error {
	err := database.InsertApplication(app)

	return err
}
