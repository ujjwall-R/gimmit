from src.ports.controllers.CommitControllerI import CommitControllerI
from src.controllers.CommitController import CommitController
from src.use_cases.TuiCore import TuiCore
from src.use_cases.GitCore import GitCore
from src.adaptors.AdminServer import AdminServer
from src.ports.adaptors.AdminServerI import AdminServerI

sample_git_repo = "/home/ujjwal/Desktop/temp"

tui_core : TuiCore = TuiCore()
git_core : GitCore = GitCore(sample_git_repo)
admin_server_adaptor : AdminServerI = AdminServer()
commit_controller : CommitControllerI = CommitController(tui_core, git_core, admin_server_adaptor)

def main():
    commit_controller.commit()


if __name__ == "__main__":
    main()