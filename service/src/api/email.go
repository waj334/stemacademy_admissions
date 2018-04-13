package main

import (
	"gopkg.in/gomail.v2"
)

//SendEmail Send email using gmail
func SendEmail(to string, subject string, body string) error {
	pwd, err := ReadPasswd(config.EmailPasswdFile)

	if err == nil {
		d := gomail.NewDialer(
			config.SMTPHost,
			config.SMTPPort,
			config.SMTPUser,
			pwd,
		)

		m := gomail.NewMessage()
		m.SetHeaders(map[string][]string{
			"From":    {m.FormatAddress("noreply@tuskegee.edu", "no-reply")},
			"To":      {to},
			"Subject": {subject},
		})

		m.SetBody(
			"text/html",
			body,
		)

		return d.DialAndSend(m)
	}

	/*msg := fmt.Sprintf(
				`Subject: %s
	MIME-version: 1.0;
	Content-Type: text/html; charset="UTF-8";

	%s`,
				subject,
				body,
			)

			return smtp.SendMail(
				fmt.Sprintf("%s:587", config.EmailSMTP),
				smtp.PlainAuth("", config.Email, pwd, config.EmailSMTP),
				config.Email,
				[]string{to},
				[]byte(msg),
			)
		}*/

	return err
}
