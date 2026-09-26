---
name: asciidoc-pages-build
description: "Use when changing this repository's AsciiDoc HTML build or GitHub Pages build workflow, including pages.yml, Asciidoctor dependencies, Docker image tags or digests, Graphviz diagrams, and build validation."
---

# AsciiDoc Pages Build

Use this skill when modifying how this repository converts AsciiDoc to HTML for GitHub Pages. Keep changes to the build path unless the request explicitly includes deployment or artifact changes.

## Repository Build Contract

- Workflow: `.github/workflows/pages.yml`; build runs on `ubuntu-latest` after checkout.
- Build command: `make -C docs adoc`.
- Build output: `dist/`, uploaded by the existing Pages artifact step.
- Makefiles call `asciidoctor --trace` and share options from `docs/asciidoc.mk`.
- Required tools and extensions: `make`, Ruby/Asciidoctor, `asciidoctor-diagram`, Rouge, and Graphviz `dot`.
- `docs/group.adoc` has Graphviz diagram blocks. Makefiles also copy image assets with `cp -n -l`; test this behavior in the chosen environment.
- There is no repository Gemfile, Gemfile.lock, or `.ruby-version`. Avoid introducing a separately managed Ruby dependency stack unless there is a clear reason.

## Current CI Baseline

The workflow invokes the official `asciidoctor/docker-asciidoctor` image directly and pins it by OCI digest. The currently recorded image is release `1.107.0`, digest `sha256:23c022800c00bd7b73fe4e3deca49c77500f0fb34035b131cfed3f835e8d9de9`. Treat this as the current repository pin, not as a digest to reuse for a different image release. The official image was verified to include Asciidoctor, Asciidoctor Diagram, Rouge, Graphviz, and `make`.

The build step mounts `$GITHUB_WORKSPACE` at `/documents`, uses `/documents` as its working directory, runs as the runner UID/GID, and preserves the Makefile command:

```yaml
run: |
  docker run --rm \
    --user "$(id -u):$(id -g)" \
    --volume "$GITHUB_WORKSPACE:/documents" \
    --workdir /documents \
    asciidoctor/docker-asciidoctor@sha256:<verified-digest> \
    make -C docs adoc
```

## Updating the Build Image

1. Check the official [`asciidoctor/docker-asciidoctor` releases](https://github.com/asciidoctor/docker-asciidoctor/releases), README, and Dockerfile for the candidate tag. Confirm it provides the required tools and extensions; do not assume the latest release has the same contents.
2. Resolve the candidate tag to its registry manifest digest. For example, query Docker Hub's registry API for `asciidoctor/docker-asciidoctor` and the exact tag, requesting OCI index / Docker manifest-list media types. Record the complete `sha256:` digest and verify it corresponds to that tag; never invent or truncate it. Prefer the multi-platform index digest unless a specific runner architecture is intentionally required.
3. Update only the image tag comment and digest in the AsciiDoc build step. Keep the mount, UID/GID, working directory, and `make -C docs adoc` command unless the build contract itself is deliberately changing.
4. Do not change `actions/upload-pages-artifact`, `actions/deploy-pages`, Pages permissions, triggers, or deployment settings as part of an AsciiDoc toolchain update unless explicitly requested.

## Validation

- Run the complete `make -C docs adoc` build in the exact selected image, not merely `asciidoctor` on one file.
- Confirm Graphviz diagrams render and the `cp -n -l` image-copy steps succeed.
- Confirm the build exits successfully and populates `dist/` with the HTML and required assets.
- Run `git diff --check` and inspect the workflow diff to ensure only the intended build change is present.
- If Docker is unavailable locally, report that the container build could not be run and rely on the GitHub Actions build for execution validation; do not imply that the build passed.
