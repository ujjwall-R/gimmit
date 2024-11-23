package entity

import (
	"time"
)

type CommitInfo struct {
	commit_hash  string
	author_name  string
	author_email string
	message      string
	timestamp    time.Time
}
