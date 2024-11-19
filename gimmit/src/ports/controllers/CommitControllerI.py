from abc import ABC, abstractmethod

class CommitControllerI(ABC):
    @abstractmethod
    def commit(self)->None:
        """gimmit commit feature"""
        pass