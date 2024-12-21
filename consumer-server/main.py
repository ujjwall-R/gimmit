from src.adaptors.KafkaConsumer import KafkaConsumer
from src.adaptors.DbAdaptor import DbAdaptor
from src.use_cases.MessageProcessor import MessageProcessor
from src.controllers.QueueController import QueueController

if __name__ == "__main__":
    # Kafka Consumer Configuration
    kafka_config = {
    'bootstrap.servers': '127.0.0.1:9092',  # Kafka's external listener
    'group.id': 'kafka-python-getting-started',
    'auto.offset.reset': 'earliest',
    'security.protocol': 'PLAINTEXT',  # Since the listener is configured for PLAINTEXT
    }
    topic = "commited"

    # Initialize components
    kafka_consumer = KafkaConsumer(config=kafka_config, topic=topic)
    db_adaptor = DbAdaptor(uri="mongodb://localhost:27017", db_name="analytics_db")
    processor = MessageProcessor(db_adaptor=db_adaptor)

    # Kafka Controller to orchestrate everything
    kafka_controller = QueueController(kafka_consumer=kafka_consumer, message_processor=processor)

    print("Starting Kafka Controller...")
    kafka_controller.start()
