from src.entity.data_structures import CommitInfo

class TuiCore:
    def display_and_gather_commit_info(self) -> str:
        message = input("Enter commit message: ")
        return message
