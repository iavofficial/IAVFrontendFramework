# Contributing to This Project

We are happy about your interest in the project. Did you encounter a bug, do you have a feature idea to improve the framework, do you want to participate in the development or do you just have questions about the project?

We appreciate any contribution to improve the project. Please adhere to the following guidelines. The guidelines apply to all contributors, i.e., also to the project maintainers, to make the contribution valuable and transparent for the project community.

## Contact

In addition to the [discussions](https://github.com/iavofficial/IAVFrontendFramework/discussions) section,
you can contact the project maintainers via [mail](mailto:frontendframework@iav.de).

## How to Contribute

- **Feature Requests**  
  Got an idea to improve the framework? Check if it’s already [documented](https://github.com/iavofficial/IAVFrontendFramework/issues) or [discussed](https://github.com/iavofficial/IAVFrontendFramework/discussions). If not, start a new [discussion](https://github.com/iavofficial/IAVFrontendFramework/discussions). Once discussed, create a new [issue](https://github.com/iavofficial/IAVFrontendFramework/issues) linking to the discussion, with a clear and concise description and use case.

- **Bug Reports**  
  Encountered a bug? Check if it’s already [reported](https://github.com/iavofficial/IAVFrontendFramework/issues). If not, open a new [issue](https://github.com/iavofficial/IAVFrontendFramework/issues) using the [template](https://github.com/iavofficial/IAVFrontendFramework/issues/new/choose) to provide necessary details for reproduction and fixing.

- **Code Contributions**  
  Want to contribute code? First, file and discuss a [related issue](https://github.com/iavofficial/IAVFrontendFramework/issues). Comment on the issue to claim it, and follow the [process](#process-for-code-contributions) for submitting your code.

- **Discussions**  
  Have a new idea or feedback? Start a new thread in the [discussions](https://github.com/iavofficial/IAVFrontendFramework/discussions). More details are [here](https://github.com/iavofficial/IAVFrontendFramework/discussions/1).

## How to Make a Pull Request

***If you don't have Git installed on your machine, [install it](https://help.github.com/articles/set-up-git/).***

**1.** Fork [this repository](https://github.com/iavofficial/IAVFrontendFramework).  
Click on the <a href="https://github.com/iavofficial/IAVFrontendFramework"><img src="https://img.icons8.com/ios/24/000000/code-fork.png"></a> symbol at the top right corner of the page.

**2.** Clone the forked repository.

```bash
git clone https://github.com/<your-github-username>/IAVFrontendFramework
```

**3.** Navigate to the project directory.

```bash
cd IAVFrontendFramework
```
**5.** Create a new branch:
```bash
git checkout -b <branchName>
```

**6.** Make changes in source code.

**7.** Stage your changes and commit

```bash
git add <file1,file2....>
```
```bash
git commit -m "<commitMessage>"
```

**8.** Push your local commits to the remote repo.

```bash
git push origin <branchName>
```

**9.** Create a [Pull Request](https://github.com/iavofficial/IAVFrontendFramework/pulls).

## Style Guides for Git Commit Messages

### Here's a list of some good to have points, that can add more value to your contribution logs.

| **Type**      | **Description**                                                                                     | **Example Commit Message**                           |
|---------------|-----------------------------------------------------------------------------------------------------|------------------------------------------------------|
| **fix**       | Patches a bug in the codebase (PATCH in semantic versioning).                                        | `fix: resolve issue with user authentication`        |
| **feat**      | Introduces a new feature to the codebase (MINOR in semantic versioning).                             | `feat: add user profile management feature`          |
| **docs**      | Documentation only changes.                                                                         | `docs: update README with new setup instructions`    |
| **style**     | Changes that do not affect the meaning of the code (white-space, formatting, etc.).                 | `style: format code according to ESLint rules`       |
| **refactor**  | Code change that neither fixes a bug nor adds a feature.                                             | `refactor: optimize user service class structure`    |
| **test**      | Adding or correcting tests.                                                                         | `test: add unit tests for user service`              |


**Commit Message Format**

```
test:  add unit tests for user service
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: fix, feat, docs, style, refactor or test.
```

For more detailed reference to the above points, refer <a href="https://www.conventionalcommits.org/en/v1.0.0/">here</a>.

## GitHub Pages
For documentation see the [GitHub Pages](https://iavofficial.github.io/IAVFrontendFramework/) of the project.
