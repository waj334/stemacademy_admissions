package main

//School struct holding information of student's highschool for API
type School struct {
	Name    string `json:"name"`
	County  string `json:"county"`
	Address string `json:"address"`
	City    string `json:"city"`
	State   string `json:"state"`
	Zip     string `json:"zip"`
}

// NewSchool Create new school
func NewSchool(name string, address string, city string, state string, zip string, county string) *School {
	return &School{
		Name:    name,
		Address: address,
		City:    city,
		State:   state,
		Zip:     zip,
		County:  county,
	}
}
