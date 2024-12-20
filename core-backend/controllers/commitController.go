package controllers

import (
	"core-backend/core"
	"core-backend/entity"
	"net/http"

	"github.com/gin-gonic/gin"
)

type IcommitController interface {
	Commit(cc *gin.Context)
}

type commitController struct {
	commitCore               *core.CommitCore
	queueControllerInterface IqueueController
}

func (this *commitController) Commit(c *gin.Context) {
	var commitInfo entity.CommitInfo
	if err := c.ShouldBindJSON(&commitInfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// err := this.commitCore.SaveCommitData(&commitInfo)
	// if err != nil {
	// 	c.JSON(http.StatusOK, gin.H{"error": err})
	// 	return
	// }
	err := this.queueControllerInterface.Produce("commited", commitInfo) //TODO : topic name as env
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error producing event!"})
	}
	c.JSON(http.StatusOK, gin.H{"message": "Commit successful!"})
}

func NewCommitController(commitCore *core.CommitCore, queuqueueControllerInterface IqueueController) IcommitController {
	return &commitController{commitCore: commitCore, queueControllerInterface: queuqueueControllerInterface}
}
