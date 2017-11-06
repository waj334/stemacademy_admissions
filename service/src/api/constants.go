package main

//Entity Types
const (
	EntityAdmin 		= 0
	EntityInstructor 	= 1
	EntityIntern 		= 2
	EntityTeacher 		= 3
	EntityStudent 		= 4
	EntityGuardian		= 5
	EntitySession		= 6
	EntitySchool		= 7
)

//Ethnicity Types
const (
	EthnicityAfricanAmerican		= 0
	EthnicityAsian					= 1
	EthnicityCaucaiusion			= 2
	EthnicityHispanicLatino			= 3
	EthnicityNativeAmericanAlaskan 	= 4
	EthnicityNativeHawaiian			= 5
	EthnicityOther					= 6
)

//Name Types
const (
	NameFirst	= 0
	NameLast	= 1
	NameTitle	= 2
)

//Citizenship Types
const (
	CitizenshipUS 	= 0
	CitizenshipDual = 1
	CitizenshipNon 	= 3
)

//Gender Types
const (
	GenderMale 		= 0
	GenderFemale 	= 1
)

//Contact Types
const (
	ContactPhone			= 0
	ContactAlternatePhone 	= 1
	ContactEmergency		= 2
	ContactEmail			= 3
	ContactAlternateEmail	= 4
)

//Status Types
const (
	StatusAccepted 			= 1
	StatusRejected			= 2
	StatusNeedAdditionInfo	= 3
	StatusConfirmed			= 4
	StatusAttending			= 5
)