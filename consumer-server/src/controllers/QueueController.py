import time

class QueueController:
    def __init__(self, kafka_consumer, message_processor):
        self.kafka_consumer = kafka_consumer
        self.message_processor = message_processor

    def start(self):
        print("KafkaController started.")
        try:
            while True:
                try:
                    consumed_data = self.kafka_consumer.consume()
                    if consumed_data:
                        self.message_processor.process_message(consumed_data)
                except Exception as process_error:
                    print(process_error)
                time.sleep(5)
        except KeyboardInterrupt:
            pass
        except Exception as e:
            print(e)
            pass
        finally:
            self.kafka_consumer.closeKafkaConsumer()
