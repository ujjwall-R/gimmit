package main

import (
	"core-backend/adapters/database_adapter"
	"core-backend/adapters/rest_adapter"
	"core-backend/controllers"
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
	db, err := database_adapter.NewInstance(mongoURI, dbName)
	var commit_controller controllers.IcommitController = controllers.NewCommitController(db)
	router := rest_adapter.SetupRouter(commit_controller)
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	} else {
		fmt.Println("DB Connected Successfully!")
	}
	var dbInterface database_adapter.IDB = db
	fmt.Println(dbInterface)
	router.Run(":8080")
}
