# Contributing to the IAV Frontend Framework

We are happy about your interest in the project. Did you encounter a bug, do you have
a feature idea to improve the framework, do you want to participate in the development
or do you just have questions about the project?

We appreciate any contribution to improve the project. Please adhere to the following guidelines.
The guidelines apply to all contributors, i.e., also to the project maintainers, to make the
contribution valuable and transparent for the project community.

### Types of Contribution

- **Feature Requests -**
  You have an idea on how to improve the framework? The idea is as of yet neither documented
  as [issue](https://github.com/iavofficial/IAVFrontendFramework/issues)
  nor [discussed](https://github.com/iavofficial/IAVFrontendFramework/discussions)? Then, please open a
  new [discussion](https://github.com/iavofficial/IAVFrontendFramework/discussions)
  to propose your idea. The discussion will allow for reasoning if the idea fits to the project scope and, furthermore,
  to
  improve the idea. Further information about our discussion section can be
  found [here](https://github.com/iavofficial/IAVFrontendFramework/discussions/1). For the discussed ideas to be
  integrated in the framework, a new [issue](https://github.com/iavofficial/IAVFrontendFramework/issues)
  has to be created and linked to the discussion. The issue description has to be clear, concise as well as meaningful
  and
  should provide a use case to show the relevance of the idea to be realized.

- **Bug Reports -**
  You have encountered a bug? The bug is not yet [reported](https://github.com/iavofficial/IAVFrontendFramework/issues)?
  Then, please open a new [issue](https://github.com/iavofficial/IAVFrontendFramework/issues) to report the bug based
  on the defined [template](https://github.com/iavofficial/IAVFrontendFramework/issues/new/choose). The template
  supports the provision
  of the required information to reproduce as well as locate and, in the end, to fix the bug.

- **Code Contributions -**
  We welcome code contributions to improve the frontend framework. For code contributions, a respective
  [issue](https://github.com/iavofficial/IAVFrontendFramework/issues) has to be filed and discussed.
  Independently of the issue type (bug/feature request), you should comment on the issue that it is selected by you
  to be realized. We refer to the described [process](#process-for-code-contributions) for code contributions.

- **Discussions -**
  You have a new idea, want to provide feedback to an ongoing discussion or just have questions? Then, please open
  a new thread in the [discussions](https://github.com/iavofficial/IAVFrontendFramework/discussions) section. Further
  information about the section can be found [here](https://github.com/iavofficial/IAVFrontendFramework/discussions/1).

## Contact

In addition to the [discussions](https://github.com/iavofficial/IAVFrontendFramework/discussions) section,
you can contact the project maintainers via [mail](mailto:frontendframework@iav.de).

## Process for Code Contributions

### Preconditions

- For a more efficient way of providing patches, we suggest potential contributors to have
  a [GitHub account](https://github.com/signup/free) and to
  have [Git installed](https://help.github.com/articles/set-up-git/).
- For code contributions, a respective [issue](https://github.com/iavofficial/IAVFrontendFramework/issues) has been
  filed and assigned.
- The IAV Frontend Framework is licensed
  under [Apache 2.0](https://github.com/iavofficial/IAVFrontendFramework/blob/main/LICENSE).
  All changes will be released under the same licence.
- Your changes should comply with the existing coding style for consistency.
- We recommend to apply the provided [Prettier configuration](./.prettierrc)

### Implement Code Contribution

1. Please [fork](https://help.github.com/articles/fork-a-repo/) the development branch to your account and clone your
   new repository.
   - The development branch represents the latest and verified development version of the IAV Frontend Framework.
   - The name of the forked repository should contain the issue number the contribution will be made for.
   - Each forked repository should be linked to just one issue to allow for separation of concerns.
   - To prevent from later merge conflicts, the forked repository ahould be synchronised
     ([Git-Rebase](https://docs.github.com/de/get-started/using-git/about-git-rebase)) with the development branch on a
     regular basis.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
Fork [this repository](https://github.com/iavofficial/IAVFrontendFramework) by clicking on the
<a href="https://github.com/iavofficial/IAVFrontendFramework"><img src="https://img.icons8.com/ios/24/000000/code-fork.png"></a>
symbol at the top right corner of the page.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--> Clone the forked repository.

```bash
git clone https://github.com/iavofficial/IAVFrontendFramework.git
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--> Navigate to the project directory.

```bash
cd IAVFrontendFramework
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--> Create a new branch.

```bash
git checkout -b <branchName>
```

2. For setting up the development environment, we refer to the install section of
   the [GitHub Pages](https://iavofficial.github.io/IAVFrontendFramework/installation-guide.html).

3. Implement your changes in your forked repository.
   - The changes should be minimal and focussed on the linked issue.
   - Each commit and its contained changes represents a logical unit. No mixture of different topics to be addressed.
   - Each commit message contains the linked issue number, is meaningful and lists its changes in a comprehensible way.
     We refer to the [style guide](#style-guides-for-git-commit-messages) as guideline to write commit messages.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--> Stage your changes and commit.

```bash
git add <file1,file2....>
```

```bash
git commit -m "<commitMessage>"
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--> Push your local commits to the remote repository.

```bash
git push origin <branchName>
```

4. Test your changes and their integration.
   - All tests must be documented and pushed to the forked repository.
   - All new as well as regression tests must be executed successfully.

### Submit Code Contribution

##### Preconditions

- All changes are pushed to forked repository.
- Forked repository is rebased to the development branch to reduce potential merge conflicts.
- All test are executed successfully.

##### Process

1. Create a [Pull Request](https://github.com/iavofficial/IAVFrontendFramework/pulls). For details on how to create
   a Pull Request, please refer to the [article from GitHub](https://help.github.com/articles/about-pull-requests/).

   - Check the list of changes to comprise solely source files and their code changes, but no build artifacts.

2. Link the submitted pull request to the issue the contribution is made for.

3. Provide a comprehensive change description in the pull request summary to improve the understanding of the
   changes for the reviewers.

4. The test result should be provided as screenshot to the pull request to support the validiation of the code
   contribution.

### Reviews of Contribution

Each pull request will be reviewed by the project maintainers. Please cooperate with the reviewers for the integration
of feedback and suggestions.
In the end, the verified pull request will be merged into the development branch.

### GitHub Pages

For the documentation, we refer to the [GitHub Pages](https://iavofficial.github.io/IAVFrontendFramework/) of the project.

### Style Guides for Git Commit Messages

| **Type**     | **Description**                                                                     | **Example Commit Message**                        |
| ------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------- |
| **fix**      | Patches a bug in the codebase (PATCH in semantic versioning).                       | `fix: resolve issue with user authentication`     |
| **feat**     | Introduces a new feature to the codebase (MINOR in semantic versioning).            | `feat: add user profile management feature`       |
| **docs**     | Documentation only changes.                                                         | `docs: update README with new setup instructions` |
| **style**    | Changes that do not affect the meaning of the code (white-space, formatting, etc.). | `style: format code according to ESLint rules`    |
| **refactor** | Code change that neither fixes a bug nor adds a feature.                            | `refactor: optimize user service class structure` |
| **test**     | Adding or correcting tests.                                                         | `test: add unit tests for user service`           |

**Commit Message Format**

```
test:  add unit tests for user service
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: fix, feat, docs, style, refactor or test.
```

For more detailed reference to the above points, we refer to https://www.conventionalcommits.org/en/v1.0.0/.
