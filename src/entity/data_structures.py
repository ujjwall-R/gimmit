
from dataclasses import dataclass

@dataclass
class CommitInfo:
    commit_hash : str
    timestamp: str
    author: str
    message: str