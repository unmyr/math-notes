---
name: Document build instructions
description: Build the math-notes AsciiDoc documents from a Linux environment.
applyTo: "**/*.adoc"
---
# Document build instructions

- Build the documentation only when the repository is being worked on from Linux.
- When the repository is opened from Windows through WSL2, run the build in the WSL2 Linux shell, not in PowerShell or Command Prompt.
- From the Linux shell, run the repository's standard build command from the home directory:

```sh
(cd ~/ && make math-notes)
```

- Do not substitute a Windows shell command for this build command.
- The build uses the repository's Makefiles and requires the Linux-side documentation toolchain to be installed.
