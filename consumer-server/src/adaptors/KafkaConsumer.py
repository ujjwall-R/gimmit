from confluent_kafka import Consumer
from src.ports.adaptors.KafkaConsumerI import KafkaConsumerI

class KafkaConsumer(KafkaConsumerI):
    def __init__(self, config, topic):
        self.consumer = Consumer(config)
        self.topic = topic
        self.consumer.subscribe([self.topic])
    
    def closeKafkaConsumer(self):
        self.consumer.close()

    def consume(self):
        try:
            msg = self.consumer.poll(1.0)
            if msg is None:
                print("Waiting...")
            elif msg.error():
                print(f"ERROR: {msg.error()}")
            else:
                key = msg.key().decode('utf-8') if msg.key() else None
                value = msg.value().decode('utf-8')
                print(f"Consumed event from topic {msg.topic()}: key = {key}, value = {value}")
                return {'key':key,'value':value}
        except KeyboardInterrupt:
            pass
    
    
