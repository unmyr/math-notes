---
name: AsciiDoc formatting rules
description: This file describes the canonical AsciiDoc formatting rules for this repository, intended for repository-aware AI suggestions (Copilot-family). It includes key rules and examples for math blocks and list item continuations, as well as CI validation suggestions.
applyTo: "**/*.adoc"
---
# AsciiDoc formatting rules for this repository

Purpose
- This guidance is intended for repository-aware AI suggestions (Copilot-family) and documents canonical AsciiDoc rules used in this repository. Apply only to files matching `*.adoc`.

Scope
- File pattern: `*.adoc` (only AsciiDoc source files)
- Filename hint: this file includes `asciidoc` to indicate its scope.

Key rules (short)
- Math/display blocks: use `[stem,latexmath]` followed by a blank line, then `++++` to open the block and `++++` to close, with a blank line after the block. Example (correct):

```asciidoc
[stem,latexmath]
++++
A = \frac{T + T^{T}}{2}, \qquad B = \frac{T - T^{T}}{2}
++++
```

- Description lists and paragraph continuation inside list items: when continuing with a block under a `::`/`:::` item, place a single `+` on its own line to indicate a block continuation, then the block (and use the math block rules above inside it). Example (correct):

```asciidoc
(1)の解説::: 対称部分(symmetric part)と反対称部分(antisymmetric part)と呼びます。行列表記では次のように書けます。
+
[stem,latexmath]
++++
A = \frac{T + T^{T}}{2}, \qquad B = \frac{T - T^{T}}{2}
++++
+
これにより分解は一意的であることが分かります。
```

- Avoid variants that omit the blank-line + `+` separators or that use three `+` instead of four `++++` for math blocks; those are not handled reliably by our toolchain.

Canonical examples (for copying into prompts)

- Incorrect (do not generate):

```asciidoc
(1)の解説::: 対称部分(symmetric part)と反対称部分(antisymmetric part)と呼びます。行列表記では次のように書けます。

[stem,latexmath]
+++
A = \frac{T + T^{T}}{2}, \qquad B = \frac{T - T^{T}}{2}
+++

これにより分解は一意的であることが分かります。
```

- Correct (generate like this):

```asciidoc
(1)の解説::: 対称部分(symmetric part)と反対称部分(antisymmetric part)と呼びます。行列表記では次のように書けます。
+
[stem,latexmath]
++++
A = \frac{T + T^{T}}{2}, \qquad B = \frac{T - T^{T}}{2}
++++
+
これにより分解は一意的であることが分かります。
```

CI / Validation suggestion
- Validate `.adoc` files using `asciidoctor` in CI to catch formatting errors early.
- Quick local check (requires Ruby + gem or docker):

```bash
# install (one-time)
gem install asciidoctor

# validate/build HTML locally
asciidoctor -b html5 docs/**/*.adoc
```

- Minimal GitHub Actions idea: run `gem install asciidoctor` then `asciidoctor -b html5` on changed `*.adoc` files.

How to use this file
- Place this file at repository root. Copilot-like models often use repo files to infer style; include concrete correct/incorrect examples to make pattern matching easier.
- If you need, add more canonical examples (edge cases) under the same file.

Contact
- Maintainer: add your name/email if you want model authors to prefer specific conventions.
