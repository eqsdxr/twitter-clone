package main

import (
	"encoding/json"
	"log"
	"os"
	"time"
)

type User struct {
	ID          int  `json:"id"`
	Username    string `json:"username"`
	AvatarURL   string `json:"avatar_url"`
	CreatedAt   time.Time `json:"created_at"`
}

type Comment struct {
	ID        int  `json:"id"`
	PostID    int  `json:"post_id"`
	UserID    int  `json:"user_id"`
	Content   string `json:"content"`
	CreatedAt time.Time  `json:"created_at"`
}

type Post struct {
	ID        int  `json:"id"`
	UserID    int  `json:"user_id"`
	Content   string `json:"content"`
	CreatedAt time.Time  `json:"created_at"`
	Media []Media `json:"media"`
}

type DB struct {
	Users    []User    `json:"users"`
	Posts    []Post    `json:"posts"`
	Comments []Comment `json:"comments"`
}

type Media struct {
	Type string `json:"type"`
	Link string `json:"link"`
}

type CommentResponse struct {
	Comment Comment `json:"comment"`
	User User `json:"user"`
}

type PostResponse struct {
	Post Post `json:"post"`
	User User `json:"user"`
	Comments []CommentResponse `json:"comments"`
}

func GetDB() DB {
	rawDb, err := os.ReadFile("../db/db.json")
	if err != nil {
		log.Fatal(err)
	}

	var db DB
	err = json.Unmarshal(rawDb, &db)
	if err != nil {
		log.Fatal(err)
	}

	return db
}
