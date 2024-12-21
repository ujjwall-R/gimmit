from abc import ABC, abstractmethod

class DbAdaptorI(ABC):
    @abstractmethod
    def save_result(self, data):
        pass
