package main

// Application application record
type Application struct {
	id          int    `json:"id"`
	status      int    `json:"status"`
	applicantID string `json:"applicant_id"`
	sessionName string `json:"session_name"`
}

func NewApplication(id int, status int, applicantID string, sessionName string) *Application {
	return &Application{
		id:          id,
		status:      status,
		applicantID: applicantID,
		sessionName: sessionName,
	}
}

// ApplicationPayload hold complete application data
type ApplicationPayload struct {
	ApplicationDaata Application `json:"application"`
	ApplicantData    Applicant   `json:"applicant"`
	SchoolData       School      `json:"school"`
}

// NewApplicationPayload create a new application payload
func NewApplicationPayload(applicant Applicant, school School) *ApplicationPayload {
	return &ApplicationPayload{
		ApplicantData: applicant,
		SchoolData:    school,
	}
}

// SubmitApplication Processes application data and inserts into database
func SubmitApplication(payload *ApplicationPayload) error {
	//Insert school information into database
	err := sql.SQLInsertSchool(&payload.SchoolData)

	if err.Code.Name() == "unique_violation" {
		//Update info?
	} else {
		return err
	}

	//Insert applicant info into database
	err = sql.SQLInsertApplicant(&payload.ApplicantData)

	if err.Code.Name() == "unique_violation" {
		//Update info?
	} else {
		return err
	}

	//Insert application record into database

	//Application processed successfully!
	return nil
}

// GetApplications Get all applicants for a session
func GetApplications(session string) *ApplicationPayload {

}
