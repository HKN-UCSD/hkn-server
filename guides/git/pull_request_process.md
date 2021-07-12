# Process For Working With Pull Requests:

## Overall Process In Several Steps:
1. If you have just made a commit, GitHub will show an option to make a Pull Request (PR) for the branch you just committed to, near the top of your screen when you are on our repo's main GitHub page. Otherwise, go to the branch you want to make a PR for, click on `Contribute`, then click on `Open Pull Request` to open a PR for your branch.
2. Add to the description of the PR if need be to properly describe what you did for your PR. This is especially important for frontend tasks, where you can add images and even videos of your progress/functionality.
3. Assign yourself, as well as others who have worked on the same PR, under `Assignees` (or just remind others who have worked on the PR to add their names).
4. You need not add anyone for `Reviewers` because @thaigillespie will eventually assign 2 people to review your PR. However, you can add `HKN-UCSD/softwaredevs` to the list of `Reviewers` if you want to just have something there before @thaigillespie gets to it.
5. Until you get the needed approval(s), work with reviewer(s) to fix and/or improve the code you wrote.
6. After you get the necessary approval(s), remember to merge in latest updates to `master` branch to the branch of your PR. Remember also to resolve any merge conflicts before moving on to merging your branch.
7. After you complete step 6, go ahead and `Squash and Merge` commits from your branch on the PR to `master` branch.

## Some Things To Keep In Mind:
- If you are the one opening the PR for your branch, you are responsible for responding to reviews, resolving any merge conflicts, updating your branch with changes from `master`, and merging commits from your branch to `master` after getting necessary approvals.
- If there are more than one person reviewing your PR, it is strongly preferred that you obtain most or all reviewers' approvals before proceeding with merging. However, we only require 1 approval, so you need at least that much.
- Do not use your commit message for your PR's title. GitHub automatically gets a portion of your most recent commit message and puts it in the PR's title, so please remove that and write your own unless your commit message is short enough to fit in the title.