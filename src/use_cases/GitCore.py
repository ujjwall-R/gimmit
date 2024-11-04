from git import Repo

class GitCore():
    def __init__(self, path_dir: str) -> None:
        self.repo_path = path_dir
        self.repo = Repo(path_dir)


    def commit_staged_changes(self, msg:str):
        self.repo.index.commit(msg)