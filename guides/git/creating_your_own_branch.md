# Creating Your Own Branch For Development Work:

## Basic Steps:
- `git checkout [branch]` to the branch you want to branch off of for your development branch, which is `master` branch most of the time.
- `git checkout -b [your branch's name]` to create a new development branch based on the branch you are on. Make sure to follow the [naming convention](./naming.md) for branches.
- Remember to only do the steps above after cloning the `hkn-server` repo.
- Follow the things below when you do these steps.

## Things To Keep In Mind:
- If you are on a non-master branch and you have made changes that you haven't committed, remember to commit those changes with `git commit` or stash them with `git stash` before switching back to `master` to do the steps outlined above. Otherwise, you'll run into quite a bit of trouble with `git` (speaking from experience). If you decide to stash your changes, you can retrieve them later using `git stash pop`.
- Before you want to create a new branch, **always** remember to `git branch` to check which branch you are currently on and `git status` to make sure that you don't have any uncommitted changes.
- Make sure when you commit and push your changes, you are pushing it to your own branch and no other branch. In other words, make sure your upstream is what you think it is (to check your remotes: `git remote -v`). Or you can do what I do all the time, just `git push origin [your branch name]` and you should be good to go.