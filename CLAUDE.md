# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Firebase Studio (Google IDX) workspace scaffold. It contains no application code yet — only the development environment configuration. The project uses Nix for declarative, reproducible environment setup.

## Environment Configuration

All environment configuration lives in `.idx/dev.nix`:
- **Nix channel:** `stable-24.05`
- **Packages:** None currently enabled (Node.js, Python, Go available as commented examples)
- **Extensions:** `google.gemini-cli-vscode-ide-companion`
- **Previews:** Enabled but no preview commands configured
- **Lifecycle hooks:** `onCreate` opens `dev.nix` and `README.md`; `onStart` is empty

After modifying `dev.nix`, the workspace must be reloaded for changes to take effect.

## AI Rules

`.idx/airules.md` contains Gemini-specific guidance for configuring Nix environments in Firebase Studio. It covers `dev.nix` options (`channel`, `packages`, `env`, `idx.extensions`, `idx.workspace`, `idx.previews`) and includes example setups for Node.js, Python/Flask, and Go CLI projects.

## Key Consideration

Since no framework or language has been chosen yet, the first step for any development task is to configure `.idx/dev.nix` with the appropriate packages and tooling for the selected stack.
