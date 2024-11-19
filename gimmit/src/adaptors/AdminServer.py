from src.ports.adaptors.AdminServerI import AdminServerI
from src.entity.data_structures import CommitInfo
from dataclasses import asdict

class AdminServer(AdminServerI):
    def save_commit(self, commit_info: CommitInfo) -> None:#TODO : authenticate the user
        print("Data sent to admin Server!" , asdict(commit_info))

