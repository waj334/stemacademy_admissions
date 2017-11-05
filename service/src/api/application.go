package main

// SubmitStudentApplication Processes application data and inserts into database
func SubmitStudentApplication(payload *StudentPayload) error {
	//Process school information
	schoolID, err := ProcessSchoolInfo(&payload.SchoolInfo)
	
	if err != nil {
		return err
	}

	//Set student school ID
	payload.StudentInfo.SchoolID = schoolID

	studentID, err := ProcessStudentInfo(&payload.StudentInfo)

	if err != nil {
		//Most likely database error
		return err
	}

	//Set id of guardian's student applicant
	payload.GuardianInfo.StudentID = studentID

	//Process guardian info
	err = ProcessGuardianInfo(&payload.GuardianInfo)

	if err != nil {
		//Most likely some database error
		return err
	}

	//Application processed successfully!
	return nil
}

// ProcessSchoolInfo Adds school information database if new and returns school guid
func ProcessSchoolInfo(school *School) (string, error) {
	schoolInfo := school.ToSchoolDB()

	//Generate unique ID for this school
	schoolInfo.ID = GenerateGUID()

	err := SQLInsertSchool(schoolInfo)

	//This school is already in the database if unique violation. Get existing object from database
	if err != nil {
		if err.Code.Name() == "unique_violation" {
			existingSchool, err := SQLGetSchoolByAddr(schoolInfo.Address, schoolInfo.Zip)

			if err == nil {
				schoolInfo = existingSchool
			} else {
				return "", err
			}
		} else {
			return "", err
		}
	}

	return schoolInfo.ID, nil
}

// ProcessStudentInfo Adds student info to the database and returns guid of student
func ProcessStudentInfo(student *Student) (string, error) {
	//Attempt insertion of student info into database
	studentInfo := student.ToStudentDB()
	studentInfo.ID = GenerateGUID()

	err := SQLInsertStudent(studentInfo)

	if err == nil {
		return studentInfo.ID, nil
	}

	return "", err
}

// ProcessGuardianInfo Adds guardian info to the database
func ProcessGuardianInfo(guardian *Guardian) error {
	//Attempt insertion of guardian info into database
	guardianInfo := guardian.ToGuardianDB()
	
	err := SQLInsertGuardian(guardianInfo)

	return err
}