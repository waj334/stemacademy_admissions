package main

import (
	"strings"
	"testing"
	"github.com/lib/pq"
)

//Mock data
const mockGUID = "b7vikjukctkobl1t5iu0"
const mockGUID2 = "gfjfk56kddlk56kldfk5"

var schoolA = School {
	ID: "",
	Name: "School A",
	County: "County A",
	Address: "1234 Address RD",
	City: "City A",
	State: "AL",
	Zip: "12345",
}

var schoolB = School {
	ID: "",
	Name: "School B",
	County: "County B",
	Address: "5678 Schooly ST",
	City: "City B",
	State: "NC",
	Zip: "67890",
}

var schoolBdb = School {
	ID: mockGUID2,
	Name: "School B",
	County: "County B",
	Address: "5678 Schooly ST",
	City: "City B",
	State: "NC",
	Zip: "67890",
}

//Mock our orginal function
//TODO: Just make the orignal a struct that can take function params
type MockSQLInsertSchool func(school *SchoolDB) (*pq.Error)
type MockSQLGetSchoolByAddr func(string, string) (*SchoolDB, *pq.Error)
type MockGenrateGUID func() string

type MockProcessSchoolInfo struct {
	SQLInsertSchool MockSQLInsertSchool
	SQLGetSchoolByAddr MockSQLGetSchoolByAddr
	GenerateGUID MockGenrateGUID
}

// NewMockProcessSchoolInfo create ProcessSchoolInfo mock
func NewMockProcessSchoolInfo( insertSchool MockSQLInsertSchool, getSchoolAddr MockSQLGetSchoolByAddr, genID MockGenrateGUID) *MockProcessSchoolInfo {
	return &MockProcessSchoolInfo {
		SQLInsertSchool: insertSchool,
		SQLGetSchoolByAddr: getSchoolAddr,
		GenerateGUID: genID,
	}
}

func (m *MockProcessSchoolInfo) ProcessSchoolInfo(school *School) (string, error) {
	schoolInfo := school.ToSchoolDB()
	
		//Generate unique ID for this school
		schoolInfo.ID = m.GenerateGUID()
	
		err := m.SQLInsertSchool(schoolInfo)
	
		//This school is already in the database if unique violation. Get existing object from database
		if err != nil {
			if err.Code.Name() == "unique_violation" {
				existingSchool, err := m.SQLGetSchoolByAddr(schoolInfo.Address, schoolInfo.Zip)
	
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

func _SQLInsertSchoolSuccess(school *SchoolDB) (*pq.Error) {
	return nil
}

func _SQLInsertSchoolUniqueViolation(school *SchoolDB) (*pq.Error) {
	return &pq.Error {
		Severity: 		 pq.Efatal,
		Code:            "23505",
		Message:         "unique_violation",
	}
}

func _SQLInsertSchoolError(school *SchoolDB) (*pq.Error) {
	return &pq.Error {
		Severity: 		 pq.Efatal,
		Code:            "42601",
		Message:		 "syntax_error",
	}
}

func _SQLSQLGetSchoolByAddr(addr string, zip string) (*SchoolDB, *pq.Error) {
	if strings.Compare(addr, schoolA.Address) == 0 && strings.Compare(zip, schoolA.Zip) == 0{
		return schoolA.ToSchoolDB(), nil
	} else if strings.Compare(addr, schoolB.Address) == 0 && strings.Compare(zip, schoolB.Zip) == 0{
		return schoolBdb.ToSchoolDB(), nil
	}

	return nil, nil
}

func _GenerateGUID() string {
	return mockGUID
}

func TestProcessSchoolInfo(t *testing.T) {
	type args struct {
		school *School
		insertSchool MockSQLInsertSchool
		getSchoolAddr MockSQLGetSchoolByAddr
		genID MockGenrateGUID
	}
	tests := []struct {
		name    string
		args    args
		want    string
		wantErr bool
	}{
	 {
		name: "SchoolA is new",
		args: args {
			school: &schoolA,
			insertSchool: _SQLInsertSchoolSuccess,
			getSchoolAddr: nil,
			genID: _GenerateGUID,
		},
		want: mockGUID,
		wantErr: false,
	 },
	 {
		name: "SchoolB is not new",
		args: args {
			school: &schoolB,
			insertSchool: _SQLInsertSchoolUniqueViolation,
			getSchoolAddr: _SQLSQLGetSchoolByAddr,
			genID: _GenerateGUID,
		},
		want: mockGUID2,
		wantErr: false,
	 },
	 {
		name: "Some random SQL err",
		args: args {
			school: &schoolA,
			insertSchool: _SQLInsertSchoolError,
			getSchoolAddr: nil,
			genID: _GenerateGUID,
		},
		want: "",
		wantErr: true,
	 },
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mock := NewMockProcessSchoolInfo(tt.args.insertSchool, tt.args.getSchoolAddr, tt.args.genID)
			got, err := mock.ProcessSchoolInfo(tt.args.school)
			if (err != nil) != tt.wantErr {
				t.Errorf("ProcessSchoolInfo() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("ProcessSchoolInfo() = %v, want %v", got, tt.want)
			}
		})
	}
}
