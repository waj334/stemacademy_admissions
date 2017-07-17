package main

//School struct holding information of student's highschool for API
type School struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	County  string `json:"county"`
	Address string `json:"address"`
	City    string `json:"city"`
	State   string `json:"state"`
	Zip     string `json:"zip"`
}

//SchoolDB struct holding information of student's highschool for database
type SchoolDB struct {
	ID      string `db:"id"`
	Name    string `db:"name"`
	County  string `db:"county"`
	Address string `db:"address"`
	City    string `db:"city"`
	State   string `db:"state"`
	Zip     string `db:"zip"`
}

//ToSchoolDB creates DB object from API object
func (s *School) ToSchoolDB() *SchoolDB {
	sdb := new(SchoolDB)
	sdb.ID = s.ID
	sdb.Name = s.Name
	sdb.County = s.County
	sdb.Address = s.Address
	sdb.City = s.City
	sdb.State = s.State
	sdb.Zip = s.Zip

	return sdb
}

//ToSchool Creates API School object from DB object
func (sdb *SchoolDB) ToSchool() *School {
	s := new(School)
	s.ID = sdb.ID
	s.Name = sdb.Name
	s.County = sdb.County
	s.Address = sdb.Address
	s.City = sdb.City
	s.State = sdb.State
	s.Zip = sdb.Zip

	return s
}
