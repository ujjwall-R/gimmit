from abc import ABC, abstractmethod
from src.entity.data_structures import CommitInfo
from dataclasses import asdict

class AdminServerI(ABC):
    @abstractmethod
    def save_commit(self, commit_info: CommitInfo) -> None:#TODO : authenticate the user
        """Save commit information to the server"""
        pass