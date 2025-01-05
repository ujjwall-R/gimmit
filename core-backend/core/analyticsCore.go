package core

import (
	"context"
	"core-backend/adapters/database_adapter"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

type AnalyticsCore struct {
	dbInterface database_adapter.IDB
}

func NewAnalyticsCore(dbInterface database_adapter.IDB) *AnalyticsCore {
	return &AnalyticsCore{dbInterface: dbInterface}
}

func (this *AnalyticsCore) FetchAnalyticsData(repository_id string) ([]map[string]interface{}, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var results []map[string]interface{}
	err := this.dbInterface.Find(ctx, "results", bson.M{"repository_id": repository_id}, &results)
	if err != nil {
		return nil, err
	}
	return results, nil
}
