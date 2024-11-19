package adapters

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type IDB interface {
	Insert(ctx context.Context, collection string, document interface{}) error
	Find(ctx context.Context, collection string, filter interface{}, result interface{}) error
	Update(ctx context.Context, collection string, filter interface{}, update interface{}) error
	Delete(ctx context.Context, collection string, filter interface{}) error
}

type DB struct {
	client *mongo.Client
	dbName string
}

func NewInstance(uri, dbName string) (*DB, error) {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		return nil, err
	}

	if err := client.Ping(context.TODO(), nil); err != nil {
		return nil, err
	}

	return &DB{client: client, dbName: dbName}, nil
}

func (m *DB) getCollection(collection string) *mongo.Collection {
	return m.client.Database(m.dbName).Collection(collection)
}

func (m *DB) Insert(ctx context.Context, collection string, document interface{}) error {
	_, err := m.getCollection(collection).InsertOne(ctx, document)
	return err
}

func (m *DB) Find(ctx context.Context, collection string, filter interface{}, result interface{}) error {
	cursor, err := m.getCollection(collection).Find(ctx, filter)
	if err != nil {
		return err
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, result); err != nil {
		return err
	}

	return nil
}

func (m *DB) Update(ctx context.Context, collection string, filter interface{}, update interface{}) error {
	_, err := m.getCollection(collection).UpdateOne(ctx, filter, bson.M{"$set": update})
	return err
}

func (m *DB) Delete(ctx context.Context, collection string, filter interface{}) error {
	_, err := m.getCollection(collection).DeleteOne(ctx, filter)
	return err
}
