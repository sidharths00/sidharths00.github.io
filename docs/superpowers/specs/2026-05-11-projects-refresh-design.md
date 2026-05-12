# Projects Refresh — Design

**Date:** 2026-05-11
**Scope:** `index.html` projects section only.

## Goal

Refresh the projects section to feature recent work (Spring 2026) and retire the weakest existing entry. Reorder to interleave research/coursework with product/agent work.

## Changes

### Remove
- **AI Travel Agent** — conceptually overshadowed by EA Agent and newer agentic work in the lineup.

### Add (in the same markup style as existing `.project-item` entries)

**Name That Snippet**
- Description: Multiplayer Spotify song-guessing game — sign in, host a room, race friends to name title and artist from a snippet. Three game modes, real-time scoreboard, iOS audio fallback.
- Stack: `Next.js 16 · TypeScript · Auth.js · Upstash Redis · Spotify Web API`
- Links: Demo → `https://name-that-snippet.vercel.app`, GitHub → `https://github.com/sidharths00/name-that-snippet`

**Sentinel**
- Description: Policy enforcement layer that sits between an AI agent's reasoning and its tool execution — one decorator gates risky calls (emails, payments, deletes) with configurable risk levels.
- Stack: `Python · Anthropic SDK`
- Links: GitHub → `https://github.com/sidharths00/sentinel`

### Reorder

Final order (10 entries):

1. TBlocks
2. GPT-2 + LoRA
3. Name That Snippet *(new)*
4. 2048 Q-Learning
5. EA Agent
6. Chowder
7. Sentinel *(new)*
8. Zillow Extension
9. TreeTies
10. Tashi Delek

Intent: interleave research projects (GPT-2, 2048) with product/agent work rather than clustering by type.

## Out of scope

- Hero bio, experience section, Beyond section — no changes.
- Styles, JS, dark mode, chaos button, footer — no changes.
- `/projects/*.html` detail pages — no new ones; existing list doesn't link to them anyway.
- `mcp-eval` and `gauge` — explicitly skipped (in-flight startup work, not ready to publicize).

## Acceptance

- `index.html` renders 10 project entries in the order listed.
- AI Travel Agent entry no longer present.
- Name That Snippet and Sentinel each have one description paragraph, one stack line, and the listed link(s) — matching existing markup.
- No regressions to navigation, theme toggle, or other sections.
