package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

//Student struct holding student info for API
type Student struct {
	ID          string `json:"id"`
	Firstname   string `json:"firstname"`
	Lastname    string `json:"lastname"`
	Age         int    `json:"age,string"`
	EthRace     int    `json:"eth_race,string"`
	Citizenship int    `json:"citizenship,string"`
	Gender      int    `json:"gender,string"`
	Email       string `json:"email"`
	PhoneNo     string `json:"phone_no"`
	Address     string `json:"address"`
	City        string `json:"city"`
	State       string `json:"state"`
	Zip         string `json:"zip"`
	SchoolID    string `json:"school_id"`
}

//StudentDB struct holding student info for database
type StudentDB struct {
	ID          string `db:"id"`
	Firstname   string `db:"firstname"`
	Lastname    string `db:"lastname"`
	Age         int    `db:"age,string"`
	EthRace     int    `db:"eth_race"`
	Citizenship int    `db:"citizenship"`
	Gender      int    `db:"gender"`
	Email       string `db:"email"`
	PhoneNo     string `db:"phone_no"`
	Address     string `db:"address"`
	City        string `db:"city"`
	State       string `db:"state"`
	Zip         string `db:"zip"`
	SchoolID    string `db:"school_id"`
}

//ToStudent Creates Student object from database object
func (sdb *StudentDB) ToStudent() *Student {
	s := new(Student)
	s.ID = sdb.ID
	s.Firstname = sdb.Firstname
	s.Lastname = sdb.Lastname
	s.Age = sdb.Age
	s.EthRace = sdb.EthRace
	s.Citizenship = sdb.Citizenship
	s.Email = sdb.Email
	s.PhoneNo = sdb.PhoneNo
	s.Address = sdb.Address
	s.State = sdb.State
	s.Zip = sdb.Zip
	s.SchoolID = sdb.SchoolID

	return s
}

//ToStudentDB Creates Student object from database object
func (s *Student) ToStudentDB() *StudentDB {
	sdb := new(StudentDB)
	sdb.ID = s.ID
	sdb.Firstname = s.Firstname
	sdb.Lastname = s.Lastname
	sdb.Age = s.Age
	sdb.EthRace = s.EthRace
	sdb.Citizenship = s.Citizenship
	sdb.Email = s.Email
	sdb.PhoneNo = s.PhoneNo
	sdb.Address = s.Address
	sdb.State = s.State
	sdb.Zip = s.Zip
	sdb.SchoolID = s.SchoolID

	return sdb
}

//StudentPayload struct holding student application information from API
type StudentPayload struct {
	StudentInfo  Student  `json:"student_info"`
	GuardianInfo Guardian `json:"guardian_info"`
	SchoolInfo   School   `json:"school_info"`
}

//StudentPayloadContainer struct holding the payload from API
type StudentPayloadContainer struct {
	Application StudentPayload `json:"payload"`
}

func apiStudentAppSubmit(w http.ResponseWriter, r *http.Request) {
	container := new(StudentPayloadContainer)
	var payload StudentPayload

	//Decode request body
	decoder := json.NewDecoder(r.Body)
	derr := decoder.Decode(&container)

	if derr == nil {
		payload = container.Application
	} else {
		fmt.Println(derr)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	//Process information first
	schoolInfo := payload.SchoolInfo.ToSchoolDB()

	//Generate unique ID for this school
	schoolInfo.ID = GenerateGUID()

	err := sqlInsertSchool(schoolInfo)

	//This school is already in the database if unique violation. Get existing object from database
	if err != nil {
		if err.Code.Name() == "unique_violation" {
			existingSchool, err := sqlGetSchoolByAddr(schoolInfo.Address, schoolInfo.Zip)

			if err == nil {
				schoolInfo = existingSchool
			} else {
				//Something went wrong
				fmt.Println(err)
				w.WriteHeader(http.StatusInternalServerError)
			}
		} else {
			//Something went wrong
			fmt.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	//Attempt insertion of student info into database
	studentInfo := payload.StudentInfo.ToStudentDB()
	studentInfo.ID = GenerateGUID()
	studentInfo.SchoolID = schoolInfo.ID
	err = sqlInsertStudent(studentInfo)

	if err != nil {
		//Something went wrong
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	//Attempt insertion of guardian info into database
	guardianInfo := payload.GuardianInfo.ToGuardianDB()
	guardianInfo.StudentID = studentInfo.ID
	err = sqlInsertGuardian(guardianInfo)

	if err != nil {
		//Something went wrong
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
