# Commit messages rules
* Use conventional commit messages for all commits. The format is: `<type>(<scope>): <description>`.
* The `<type>` can be one of the following: feat, fix, docs, style, refactor, test, chore.
* If changes are only under `.github/`, suggest commit title starting with chore: and a short description.
* If changes touch `*.adoc`, suggest commit title starting with docs: and a short description.
* For files under the docs directory, specify the full folder path as the scope in the Conventional Commit message.  
  Example: docs/books/algebra/index.adoc → docs(books/algebra)
* To make changes to copilot instructions, set the type to "chore" and scope to "copilot-instructions".
