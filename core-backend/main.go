package main

import (
	"core-backend/adapters/database_adapter"
	"core-backend/adapters/rest_adapter"
	"core-backend/controllers"
	"core-backend/core"
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
	commit_core := core.NewCommitCore(db)
	kafka_core := core.NewKafkaCore()
	var queueController controllers.IqueueController = controllers.NewqueueController(*kafka_core)
	var commit_controller controllers.IcommitController = controllers.NewCommitController(commit_core, queueController)

	var analytics_core core.AnalyticsCore = *core.NewAnalyticsCore(db)
	var anlytics_controller controllers.IanalyticsController = controllers.NewAnalyticsController(&analytics_core)
	router := rest_adapter.SetupRouter(commit_controller, anlytics_controller)
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	} else {
		log.Println("DB Connected Successfully!")
	}
	var dbInterface database_adapter.IDB = db
	log.Println(dbInterface)
	router.Run(":8080")
}
