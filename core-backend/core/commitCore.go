package core

import (
	"context"
	"core-backend/adapters/database_adapter"
	"core-backend/entity"
	"time"
)

type CommitCore struct {
	dbInterface database_adapter.IDB
}

func NewCommitCore(dbInterface database_adapter.IDB) *CommitCore {
	return &CommitCore{dbInterface: dbInterface}
}

func (this *CommitCore) SaveCommitData(commit_info *entity.CommitInfo) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	err := this.dbInterface.Insert(ctx, "commit_info", commit_info)
	if err != nil {
		return err
	}
	return nil
}
