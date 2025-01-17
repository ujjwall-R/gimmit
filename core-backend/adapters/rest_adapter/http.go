package rest_adapter

import (
	"core-backend/controllers"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetupRouter(commit_controller controllers.IcommitController, analytics_controller controllers.IanalyticsController) *gin.Engine {
	router := gin.Default()

	router.GET("/api/v1/check", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Service is running..."})
	})
	router.POST("/api/v1/save/commit_info", commit_controller.Commit)

	router.GET("/api/v1/analytics/:repository_id", analytics_controller.GetAnalytics)

	// router.GET("/api/v1/items", getItems)
	// router.GET("/api/v1/items/:id", getItem)
	// router.POST("/api/v1/items", createItem)
	// router.PUT("/api/v1/items/:id", updateItem)
	// router.DELETE("/api/v1/items/:id", deleteItem)

	return router
}
