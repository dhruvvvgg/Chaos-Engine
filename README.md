# Chaos Engine

An interactive F1 strategy simulator built for people who can't stop arguing about pit calls.

Every race weekend ends the same way: "they should have pitted two laps earlier," "that undercut never had a chance," "why didn't they just switch to the hards." Chaos Engine takes that argument and gives it something to actually stand on. It surfaces the statistically most dramatic moments from real F1 races, scores each race on a Chaos Score, and lets you rewrite a moment to see whether your call would have actually worked, reasoned over real race data by Gemini instead of a gut feeling.

## What it does

- **Detects chaos automatically.** No hand picked "famous moments." Every race is scanned for statistical outliers, like a pit stop landing way outside the field's typical window, a sudden pace spike, or a big swing in track position, and those are what get surfaced as the race's key moments.
- **Scores every race.** Each race gets a Chaos Score built from the magnitude of its detected anomalies, not a subjective take on how exciting it felt.
- **Runs "what if" scenarios.** Pick a detected moment, choose an alternate strategic call, and Gemini reasons over the real data from that race (pre-intervention pace, pit loss baseline, tyre degradation curve, traffic gaps) to return a grounded verdict: predicted position, estimated gap, and a better/worse/roughly-equivalent call with reasoning.
- **Writes race-level context.** A one line "why this race was chaotic" explanation is generated per race from its detected anomaly data.

## Tech stack

- **Google AI Studio (Build mode)** — the app itself was built and is hosted through AI Studio's Build mode.
- **Gemini API** — the reasoning engine behind every what-if verdict and race explanation. See [Prize Categories](#prize-categories) below for specifics.
- Frontend: dark telemetry-console UI, glass card styling, real F1 race data (pole times, fastest laps, lap counts) pulled from actual race weekends.

## Races included

| Race | Circuit | Year |
|---|---|---|
| Qatar Grand Prix | Lusail International Circuit | 2023 |
| Singapore Grand Prix | Marina Bay Street Circuit | 2023 |
| British Grand Prix | Silverstone Circuit | 2024 |
| Hungarian Grand Prix | Hungaroring | 2024 |

## Running it

This app was built and lives inside Google AI Studio's Build mode. To view or fork it:

Open the project in [Google AI Studio]([https://chaos-engine.ai.studio).

If you'd rather run it outside AI Studio, export the project as a ZIP from the Build mode interface and set the `GEMINI_API_KEY` environment variable in your own hosting environment, since the app's Gemini calls are made server-side.

## Prize Categories

**Best Use of Google AI** — Gemini is the reasoning engine behind every what-if in the app, taking real race data and returning a grounded verdict instead of a generic guess, plus writing the race-level chaos explanations. The app was also built inside Google AI Studio's Build mode.

## About

Built for the [dev.to Weekend Challenge: Passion Edition](https://dev.to/challenges/weekend-2026-07-09).
