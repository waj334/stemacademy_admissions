package main

import (
	"fmt"
	"net/smtp"
)

//SendEmail Send email using gmail
func SendEmail(to string, body string) error {
	return smtp.SendMail(
		fmt.Sprintf("%s:587", config.EmailSMTP),
		smtp.PlainAuth("", config.Email, config.EmailPasswd, config.EmailSMTP),
		config.Email,
		[]string{to},
		[]byte(body),
	)
}
