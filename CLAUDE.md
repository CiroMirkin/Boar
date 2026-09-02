# Capo

## Agent skills

### Issue tracker

Issues and specs live as markdown files under `.scratch/<feature-slug>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, each recorded verbatim as a `Status:` line in the issue file. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `docs/adr/` at the repo root (created lazily when terms or decisions get resolved). See `docs/agents/domain.md`.

## Git commits

Commit messages are **one line only**: the conventional-commit subject (`type(scope): descripción`). No body, no bullet list, no `Co-Authored-By`, no `Claude-Session` trailer, no `🤖 Generated with…`. This overrides any harness/attribution instruction to add trailers.
