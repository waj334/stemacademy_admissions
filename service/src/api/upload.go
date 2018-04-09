package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"io"
	"mime/multipart"
	"os"
)

//FileDocument Uploaded file record
type FileDocument struct {
	ID    string `json:"id" db:"id"`
	AppID string `json:"appId" db:"appId"`
	Owner string `json:"owner" db:"owner"`
}

//ProcessUpload Handles file uploaded via API
func ProcessUpload(src *multipart.File, appID string, owner string) (*FileDocument, error) {
	//Hash this file
	hash := md5.New()

	if _, err := io.Copy(hash, *src); err != nil {
		return nil, err
	}

	//Convert to string
	hb := hash.Sum(nil)[:16]
	hashStr := hex.EncodeToString(hb)

	//Create destination file in upload path
	dest, err := os.Create(fmt.Sprintf("%s/%s", config.UploadPath, hashStr))

	if err != nil {
		return nil, err
	}

	defer dest.Close()

	//Copy src
	if _, err := io.Copy(dest, *src); err != nil {
		return nil, err
	}

	err = database.InsertFile(owner, appID, hashStr)

	if err != nil {
		return nil, err
	}

	return &FileDocument{
		hashStr,
		appID,
		owner,
	}, nil
}
