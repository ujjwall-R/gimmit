
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class CommitInfo:
    commit_hash : str
    author_name: str
    author_email :str
    message: str
    timestamp: datetime = field(default_factory=datetime.now)
