from src.entity.data_structures import CommitInfo

class TuiCore:
    def display_and_gather_commit_info(self) -> CommitInfo:
        commit_id = input("Enter commit ID: ")
        parent_id = input("Enter parent ID: ")
        author = input("Enter author name: ")
        message = input("Enter commit message: ")
        return CommitInfo(commit_id, parent_id, author, message)
