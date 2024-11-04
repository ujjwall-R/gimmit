from src.ports.controllers.CommitControllerI import CommitControllerI
from src.use_cases.TuiCore import TuiCore
from src.use_cases.GitCore import GitCore
from src.entity.data_structures import CommitInfo
from src.ports.adaptors.AdminServerI import AdminServerI

class CommitController(CommitControllerI):
    def __init__(self, tuiCore : TuiCore, gitCore : GitCore, admin_server_adaptor : AdminServerI) -> None:
        self.tuiCore = tuiCore
        self.gitCore = gitCore
        self.admin_server_adaptor = admin_server_adaptor


    def commit(self) -> None:
        try:
            commit_info : CommitInfo = self.tuiCore.display_and_gather_commit_info()
            self.gitCore.commit_staged_changes(commit_info.message)
            self.admin_server_adaptor.save_commit(commit_info)
        except Exception as e:
            print(e)