package entity

import (
	"time"
)

type CommitInfo struct {
	RepositoryID string    `json:"repository_id"`
	AuthorName   string    `json:"author_name"`
	AuthorEmail  string    `json:"author_email"`
	Message      string    `json:"message"`
	Timestamp    time.Time `json:"timestamp"`
}
