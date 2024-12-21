
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class CommitInfo:
    repository_id : str
    author_name: str
    author_email :str
    message: str
    timestamp: datetime = field(default_factory=datetime.now)

@dataclass
class QueueMessage:
    key : str
    value : str