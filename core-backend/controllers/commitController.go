package controllers

import (
	database "core-backend/adapters/database_adapter"
	"net/http"

	"github.com/gin-gonic/gin"
)

type IcommitController interface {
	SaveCommitData(cc *gin.Context)
}

type commitController struct {
	dbInterface database.IDB
}

func (ctrl *commitController) SaveCommitData(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Info Saved!"})
}

func NewCommitController(db database.IDB) IcommitController {
	return &commitController{dbInterface: db}
}
