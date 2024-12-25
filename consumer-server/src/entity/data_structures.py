
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
class CommitCommiterAnalytics:
    committer_vs_commit_count : dict # {commiter:cnt}
    committerRankingByCount : list[str]
    committerRankingByBestPractices : list[str]
    # more to add

@dataclass
class RepositoryAnalytics:
    repository_id : str
    commits : list[CommitInfo]
    flagged_commits : list[CommitInfo]
    commit_commiter_analytics : CommitCommiterAnalytics

@dataclass
class QueueMessage:
    key : str
    value : str