package controllers

import (
	"core-backend/core"
	"net/http"

	"github.com/gin-gonic/gin"
)

type IanalyticsController interface {
	GetAnalytics(cc *gin.Context)
}

type analyticsController struct {
	analytics_core *core.AnalyticsCore
}

func (this *analyticsController) GetAnalytics(c *gin.Context) {
	repository_id := c.Param("repository_id")
	results, err := this.analytics_core.FetchAnalyticsData(repository_id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error producing event!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": results})
}

func NewAnalyticsController(analytics_core *core.AnalyticsCore) IanalyticsController {
	return &analyticsController{analytics_core: analytics_core}
}
