package core

import (
	"core-backend/entity"
	"encoding/json"
	"fmt"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

type KafkaCore struct {
	Producer *kafka.Producer
}

func NewKafkaCore() *KafkaCore {
	kafkaProducer, err := kafka.NewProducer(&kafka.ConfigMap{
		"bootstrap.servers": "127.0.0.1:9092", // Kafka broker address
		"debug":             "broker",
	})
	if err != nil {
		fmt.Errorf("failed to create producer: %w", err)
	}
	return &KafkaCore{Producer: kafkaProducer}
}

func (this *KafkaCore) ProduceEvent(commit_info entity.CommitInfo, topic string) error {
	value, err := json.Marshal(commit_info)
	if err != nil {
		return fmt.Errorf("failed to serialize message: %w", err)
	}
	deliveryChan := make(chan kafka.Event)
	defer close(deliveryChan)

	err = this.Producer.Produce(&kafka.Message{
		TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
		Value:          value,
	}, deliveryChan)
	if err != nil {
		return fmt.Errorf("failed to produce message: %w", err)
	}

	e := <-deliveryChan
	m := e.(*kafka.Message)

	if m.TopicPartition.Error != nil {
		return fmt.Errorf("delivery failed: %w", m.TopicPartition.Error)
	}
	close(deliveryChan)
	return nil
}
