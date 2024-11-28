package controllers

import (
	"core-backend/core"
	"core-backend/entity"
	"net/http"

	"github.com/gin-gonic/gin"
)

type IcommitController interface {
	SaveCommitData(cc *gin.Context)
}

type commitController struct {
	commitCore *core.CommitCore
}

func (this *commitController) SaveCommitData(c *gin.Context) {
	var commitInfo entity.CommitInfo
	if err := c.ShouldBindJSON(&commitInfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := this.commitCore.SaveCommitData(&commitInfo)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Info Saved!"})
}

func NewCommitController(commitCore *core.CommitCore) IcommitController {
	return &commitController{commitCore: commitCore}
}
