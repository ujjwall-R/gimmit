## Setup

### Linux

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

```bash
python main.py
```

- TODO: Setup manager power to create commit templates (at repository level/at branch level).
- TODO: Setup persist of templates.
- TODO: Setup invoke template form completion from commiter.
- TODO: Setup persist of commits and ovveride commit command to persist the commits to gimmit and execute the actual commit command.

- TODO: Dashboard controllers for commit history.
  -TODO: (Controller-Todo Tracker) Future Changes to be made.
  -TODO: (Controller-Template Deviators) Commits which don't follow repository/branch template.
  -TODO: (Controller-Commit/Committer Ratio Analytics) Data regarding commit ratio.
  -TODO: (Controller-Pending PR) Return all pending PRs.

#### Useful resources

- https://github.com/easybuilders/easybuild-framework/blob/main/easybuild/tools/repository/gitrepo.py
