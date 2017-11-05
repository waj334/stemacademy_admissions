package main

import (
	"strings"
	"testing"

	"github.com/lib/pq"
)

/// Mock data
const mockGUID = "b7vikjukctkobl1t5iu0"
const mockGUID2 = "gfjfk56kddlk56kldfk5"

var schoolA = School{
	ID:      "",
	Name:    "School A",
	County:  "County A",
	Address: "1234 Address RD",
	City:    "City A",
	State:   "AL",
	Zip:     "12345",
}

var schoolB = School{
	ID:      "",
	Name:    "School B",
	County:  "County B",
	Address: "5678 Schooly ST",
	City:    "City B",
	State:   "NC",
	Zip:     "67890",
}

var schoolBdb = School{
	ID:      mockGUID2,
	Name:    "School B",
	County:  "County B",
	Address: "5678 Schooly ST",
	City:    "City B",
	State:   "NC",
	Zip:     "67890",
}

var studentA = Student{
	ID:          "",
	Firstname:   "Albert",
	Lastname:    "Einstein",
	Age:         16,
	EthRace:     3,
	Citizenship: 0,
	Gender:      0,
	Email:       "Agenius@gmail.com",
	PhoneNo:     "3345678901",
	Address:     "1234 Where Genius's Live RD",
	City:        "Tuskegee",
	State:       "AL",
	Zip:         "36083",
	SchoolID:    mockGUID,
}

var studentB = Student{
	ID:          "",
	Firstname:   "Neal deGrasse",
	Lastname:    "Tyson",
	Age:         12,
	EthRace:     0,
	Citizenship: 0,
	Gender:      0,
	Email:       "Agenius2@gmail.com",
	PhoneNo:     "3345678901",
	Address:     "5678 Where Other Genius's Live HWY",
	City:        "Tuskegee Institute",
	State:       "AL",
	Zip:         "36088",
	SchoolID:    mockGUID,
}

var guardianA = Guardian {
	StudentID:			mockGUID,
	Firstname:			"Super",
	Lastname:			"Mom",
	PhoneNo:			"3341236789",
	Email:				"supermom@gmail.com",
}

var guardianB = Guardian {
	StudentID:			mockGUID2,
	Firstname:			"Octo",
	Lastname:			"Dad",
	PhoneNo:			"2515667887",
	Email:				"8dadpantlegs@gmail.com",
}

/// Mock SQL Errors
var sqlErrUniqueViolation = pq.Error{
	Severity: pq.Efatal,
	Code:     "23505",
	Message:  "unique_violation",
}

var sqlErrSyntaxError = pq.Error{
	Severity: pq.Efatal,
	Code:     "42601",
	Message:  "syntax_error",
}

/// Mock Functions
type MockSQLInsertSchool func(school *SchoolDB) *pq.Error
type MockSQLGetSchoolByAddr func(string, string) (*SchoolDB, *pq.Error)
type MockSQLInsertStudent func(student *StudentDB) *pq.Error
type MockSQLInsertGuardian func(guardian *GuardianDB) *pq.Error
type MockGenrateGUID func() string

/// Mock SQL Function Implementations
// School SQL funcs
func _SQLInsertSchoolSuccess(school *SchoolDB) *pq.Error {
	return nil
}

func _SQLInsertSchoolUniqueViolation(school *SchoolDB) *pq.Error {
	return &sqlErrUniqueViolation
}

func _SQLInsertSchoolError(school *SchoolDB) *pq.Error {
	return &sqlErrSyntaxError
}

func _SQLSQLGetSchoolByAddr(addr string, zip string) (*SchoolDB, *pq.Error) {
	if strings.Compare(addr, schoolA.Address) == 0 && strings.Compare(zip, schoolA.Zip) == 0 {
		return schoolA.ToSchoolDB(), nil
	} else if strings.Compare(addr, schoolB.Address) == 0 && strings.Compare(zip, schoolB.Zip) == 0 {
		return schoolBdb.ToSchoolDB(), nil
	}

	return nil, nil
}

//Student SQL functs
func _SQLInsertStudentSuccess(student *StudentDB) *pq.Error {
	return nil
}

func _SQLInsertStudentUniqueViolation(student *StudentDB) *pq.Error {
	return &sqlErrUniqueViolation
}

func _SQLInsertStudentErr(student *StudentDB) *pq.Error {
	return &sqlErrSyntaxError
}

//Guardian SQL functs
func _SQLInsertGuardianSuccess(guardian *GuardianDB) *pq.Error {
	return nil
}

func _SQLInsertGuardianUniqueViolation(guardian *GuardianDB) *pq.Error {
	return &sqlErrUniqueViolation
}

func _SQLInsertGuardianErr(guardian *GuardianDB) *pq.Error {
	return &sqlErrSyntaxError
}
/// Mock Helpers
func _GenerateGUID() string {
	return mockGUID
}

//Mock our orginal function
//TODO: Just make the orignal a struct that can take function params

type MockProcessSchoolInfo struct {
	SQLInsertSchool    MockSQLInsertSchool
	SQLGetSchoolByAddr MockSQLGetSchoolByAddr
	GenerateGUID       MockGenrateGUID
}

// NewMockProcessSchoolInfo create ProcessSchoolInfo mock
func NewMockProcessSchoolInfo(insertSchool MockSQLInsertSchool, getSchoolAddr MockSQLGetSchoolByAddr, genID MockGenrateGUID) *MockProcessSchoolInfo {
	return &MockProcessSchoolInfo{
		SQLInsertSchool:    insertSchool,
		SQLGetSchoolByAddr: getSchoolAddr,
		GenerateGUID:       genID,
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

func TestProcessSchoolInfo(t *testing.T) {
	type args struct {
		school        *School
		insertSchool  MockSQLInsertSchool
		getSchoolAddr MockSQLGetSchoolByAddr
		genID         MockGenrateGUID
	}
	tests := []struct {
		name    string
		args    args
		want    string
		wantErr bool
	}{
		{
			name: "SchoolA is new",
			args: args{
				school:        &schoolA,
				insertSchool:  _SQLInsertSchoolSuccess,
				getSchoolAddr: nil,
				genID:         _GenerateGUID,
			},
			want:    mockGUID,
			wantErr: false,
		},
		{
			name: "SchoolB is not new",
			args: args{
				school:        &schoolB,
				insertSchool:  _SQLInsertSchoolUniqueViolation,
				getSchoolAddr: _SQLSQLGetSchoolByAddr,
				genID:         _GenerateGUID,
			},
			want:    mockGUID2,
			wantErr: false,
		},
		{
			name: "Some random SQL err",
			args: args{
				school:        &schoolA,
				insertSchool:  _SQLInsertSchoolError,
				getSchoolAddr: nil,
				genID:         _GenerateGUID,
			},
			want:    "",
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

type MockProcessStudentInfo struct {
	SQLInsertStudent MockSQLInsertStudent
	GenerateGUID     MockGenrateGUID
}

func NewMockProcessStudentInfo(insertStudent MockSQLInsertStudent, genGUID MockGenrateGUID) *MockProcessStudentInfo {
	return &MockProcessStudentInfo{
		SQLInsertStudent: insertStudent,
		GenerateGUID:     genGUID,
	}
}

func (m *MockProcessStudentInfo) ProcessStudentInfo(student *Student) (string, error) {
	//Attempt insertion of student info into database
	studentInfo := student.ToStudentDB()
	studentInfo.ID = m.GenerateGUID()

	err := m.SQLInsertStudent(studentInfo)

	//TODO: Handle situation where student is already in the database

	if err == nil {
		return studentInfo.ID, nil
	}

	return "", err
}

func TestProcessStudentInfo(t *testing.T) {
	type args struct {
		student       *Student
		insertStudent MockSQLInsertStudent
		genGUID       MockGenrateGUID
	}
	tests := []struct {
		name    string
		args    args
		want    string
		wantErr bool
	}{
		{
			name: "StudentA is new",
			args: args{
				student:       &studentA,
				insertStudent: _SQLInsertStudentSuccess,
				genGUID:       _GenerateGUID,
			},
			want:    mockGUID,
			wantErr: false,
		},
		{
			name: "StudentB is not new",
			args: args{
				student:       &studentB,
				insertStudent: _SQLInsertStudentUniqueViolation,
				genGUID:       _GenerateGUID,
			},
			want:    "",
			wantErr: true,
		},
		{
			name: "Some random sql error",
			args: args{
				student:       &studentA,
				insertStudent: _SQLInsertStudentErr,
				genGUID:       _GenerateGUID,
			},
			want:    "",
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mock := NewMockProcessStudentInfo(tt.args.insertStudent, tt.args.genGUID)
			got, err := mock.ProcessStudentInfo(tt.args.student)
			if (err != nil) != tt.wantErr {
				t.Errorf("ProcessStudentInfo() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("ProcessStudentInfo() = %v, want %v", got, tt.want)
			}
		})
	}
}

type MockProcessGuardianInfo struct {
	SQLInsertGuardian MockSQLInsertGuardian
}

func NewMockProcessGuardianInfo(insertGuardian MockSQLInsertGuardian) (*MockProcessGuardianInfo) {
	return &MockProcessGuardianInfo {
		SQLInsertGuardian: insertGuardian,
	}
}

func (m *MockProcessGuardianInfo) ProcessGuardianInfo(guardian *Guardian) error {
	//Attempt insertion of guardian info into database
	guardianInfo := guardian.ToGuardianDB()
	
	err := m.SQLInsertGuardian(guardianInfo)

	//TODO: Handle situation when guardian already exists
	//TODO: Update guardian info when new information is given

	if (err != nil) {
		return err
	}

	return nil
}

func TestProcessGuardianInfo(t *testing.T) {
	type args struct {
		guardian *Guardian
		insertGuardian MockSQLInsertGuardian
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		{
			name: "GuardianA is new",
			args: args{
				guardian:       &guardianA,
				insertGuardian: _SQLInsertGuardianSuccess,
			},
			wantErr: false,
		},
		{
			name: "GuardianB is not new",
			args: args{
				guardian:       &guardianB,
				insertGuardian: _SQLInsertGuardianUniqueViolation,
			},
			wantErr: true,
		},
		{
			name: "Some random sql error",
			args: args{
				guardian:       &guardianA,
				insertGuardian: _SQLInsertGuardianErr,
			},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mock := NewMockProcessGuardianInfo(tt.args.insertGuardian)
			if err := mock.ProcessGuardianInfo(tt.args.guardian); (err != nil) != tt.wantErr {
				t.Errorf("ProcessGuardianInfo() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
