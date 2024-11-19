package main

import (
	"core-backend/adapters"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Printf("Warning: Error loading .env file: %v", err)
	}
}

func main() {
	mongoURI := os.Getenv("MONGODB_URI")
	dbName := os.Getenv("MONGODB_DB_NAME")
	router := adapters.SetupRouter()
	db, err := adapters.NewInstance(mongoURI, dbName)
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	} else {
		fmt.Println("DB Connected Successfully!")
	}
	var dbInterface adapters.IDB = db
	fmt.Println(dbInterface)
	router.Run(":8080")
}
