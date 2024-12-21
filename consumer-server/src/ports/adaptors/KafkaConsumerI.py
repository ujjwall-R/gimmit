from abc import ABC, abstractmethod

class KafkaConsumerI(ABC):
    @abstractmethod
    def consume(self):
        pass
