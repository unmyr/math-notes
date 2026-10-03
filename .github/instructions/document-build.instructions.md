---
name: Document build instructions
description: Build the math-notes AsciiDoc documents using the repository's standard build command.
applyTo: "**/*.adoc"
---
# Document build instructions

- Use the repository's standard build command in the appropriate shell for the current environment.
- If the repository is opened from Windows through WSL2, run the build inside the WSL2 Linux shell.
- In a Linux or WSL2 shell, use the repository's standard build command from the home directory:

```sh
(cd ~/ && make math-notes)
```

- The VS Code build task is designed to invoke the correct environment automatically, so there is no need to impose a blanket Linux-only restriction.
- This target uses the repository's Makefiles and requires the documentation toolchain to be available in the shell environment being used.
