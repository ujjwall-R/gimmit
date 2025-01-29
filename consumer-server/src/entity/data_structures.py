
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
    committer_vs_commit_count: dict = field(default_factory=dict)  # Use default_factory
    committerRankingByCount: list[str] = field(default_factory=list)
    committerRankingByBestPractices: list[str] = field(default_factory=list)

@dataclass
class RepositoryAnalytics:
    repository_id : str
    commits : list[CommitInfo] = field(default_factory=list)
    flagged_commits : list[CommitInfo] = field(default_factory=list)
    commit_commiter_analytics : CommitCommiterAnalytics = CommitCommiterAnalytics()

@dataclass
class QueueMessage:
    key : str
    value : str