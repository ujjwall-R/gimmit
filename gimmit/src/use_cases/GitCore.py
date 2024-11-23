from git import Repo
from src.entity.data_structures import CommitInfo

class GitCore():
    def __init__(self, path_dir: str) -> None:
        self.repo_path = path_dir
        self.repo = Repo(path_dir)

    def commit_staged_changes(self, msg : str)->CommitInfo:
        commit = self.repo.index.commit(msg)
        commit_info : CommitInfo = CommitInfo(commit_hash=commit.hexsha,author_name=commit.committer.name,
                                              author_email=commit.committer.email,message=msg)
        return commit_info
