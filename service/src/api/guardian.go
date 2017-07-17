package main

//Guardian struct holding parent/guardian information for API
type Guardian struct {
	StudentID string `json:"student_id"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	PhoneNo   string `json:"phone_no"`
	Email     string `json:"email"`
}

//GuardianDB struct holding parent/guardian information for database
type GuardianDB struct {
	StudentID string `db:"student_id"`
	Firstname string `db:"firstname"`
	Lastname  string `db:"lastname"`
	PhoneNo   string `db:"phone_no"`
	Email     string `db:"email"`
}

//ToGuardian Creates Guardian object from database object
func (gdb *GuardianDB) ToGuardian() *Guardian {
	g := new(Guardian)
	g.StudentID = gdb.StudentID
	g.Firstname = gdb.Firstname
	g.Lastname = gdb.Lastname
	g.Email = gdb.Email
	g.PhoneNo = gdb.PhoneNo

	return g
}

//ToGuardianDB Creates Guardian object from database object
func (g *Guardian) ToGuardianDB() *GuardianDB {
	gdb := new(GuardianDB)
	gdb.StudentID = g.StudentID
	gdb.Firstname = g.Firstname
	gdb.Lastname = g.Lastname
	gdb.Email = g.Email
	gdb.PhoneNo = g.PhoneNo

	return gdb
}
