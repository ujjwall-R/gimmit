from abc import ABC, abstractmethod
from src.entity.data_structures import RepositoryAnalytics

class DbAdaptorI(ABC):
    @abstractmethod
    def fetch_RepositoryAnalytics(self, repository_id : str)->RepositoryAnalytics:
        pass

    @abstractmethod
    def save_result(self, data):
        pass
