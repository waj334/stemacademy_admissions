package main

//Applicant struct holding applicant info
type Applicant struct {
	ID               string `json:"id"`
	Age              int    `json:"age"`
	Gender           int    `json:"gender"`
	Eth              int    `json:"eth_race"`
	Citizenship      int    `json:"citizenship"`
	SchoolName       string `json:"school_name"`
	Subject          string `json:"subject"`
	Grade            int    `json:"grade_level"`
	PhoneNo          string `json:"phone_no"`
	Address          string `json:"address"`
	City             string `json:"city"`
	State            string `json:"state"`
	Zip              string `json:"zip"`
	ContactFirstname string `json:"contact_firstname"`
	ContactLastname  string `json:"contact_lastname"`
	ContactPhoneNo   string `json:"contact_phone_no"`
	Group            string `json:"group"`
	Room             string `json:"room"`
}

// NewApplicant create new applicant object
func NewApplicant(id string, age int, gender int, eth int, citizenship int, school string, subject string, grade int,
	phoneNo string, address string, city string, state string, zip string, cfirstname string, clastname string,
	cphoneNo string, group string, room string) *Applicant {

	return &Applicant{
		ID: id, Age: age, Gender: gender, Eth: eth, Citizenship: citizenship, SchoolName: school, Subject: subject,
		Grade: grade, PhoneNo: phoneNo, Address: address, City: city, State: state, Zip: zip, ContactFirstname: cfirstname,
		ContactLastname: clastname, ContactPhoneNo: cphoneNo, Group: group, Room: room,
	}
}
