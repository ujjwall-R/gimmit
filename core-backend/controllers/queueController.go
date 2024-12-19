package controllers

import (
	"core-backend/core"
	"core-backend/entity"
	"fmt"
)

type IqueueController interface {
	Produce(topic string, commit_info entity.CommitInfo) error
}

type queueController struct {
	kafka_core core.KafkaCore
}

func NewqueueController(Kafka_core core.KafkaCore) IqueueController {
	return &queueController{kafka_core: Kafka_core}
}

func (this *queueController) Produce(topic string, commit_info entity.CommitInfo) error {
	err := this.kafka_core.ProduceEvent(commit_info, topic)
	if err != nil {
		fmt.Println(err)
	}
	return err
}
