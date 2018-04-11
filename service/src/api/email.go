package main

import (
	"fmt"
	"net/smtp"
)

//SendEmail Send email using gmail
func SendEmail(to string, body string) error {
	pwd, err := ReadPasswd(config.EmailPasswdFile)

	if err == nil {
		return smtp.SendMail(
			fmt.Sprintf("%s:587", config.EmailSMTP),
			smtp.PlainAuth("", config.Email, pwd, config.EmailSMTP),
			config.Email,
			[]string{to},
			[]byte(body),
		)
	}

	return err
}
