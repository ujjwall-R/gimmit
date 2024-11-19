package adapters

import "github.com/gin-gonic/gin"

func SetupRouter() *gin.Engine {
	router := gin.Default()

	// router.GET("/api/v1/items", getItems)
	// router.GET("/api/v1/items/:id", getItem)
	// router.POST("/api/v1/items", createItem)
	// router.PUT("/api/v1/items/:id", updateItem)
	// router.DELETE("/api/v1/items/:id", deleteItem)

	return router
}
