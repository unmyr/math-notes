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
