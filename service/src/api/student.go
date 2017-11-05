package main

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
