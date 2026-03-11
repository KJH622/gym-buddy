# Project Brief

## Goal
Build a working MVP in 25 minutes for matching users based on:
- available time slot
- workout style free-text input

The system should:
1. receive a user's available time and workout style text
2. classify the text into predefined tags/categories
3. match the user with other users who have similar time slots and similar workout categories

## MVP Scope
Keep this as a demo-ready product, not a full production system.

Required user flow:
1. user enters available time slot
2. user enters workout style text
3. system converts text into category tags
4. system shows matched users with similar time and tags

## Core Input / Output
Input:
- `time_slot`
- `workout_style_text`

Processing:
- classify text into predefined workout tags

Output:
- list of matched users
- each result should show matched time slot and matched category/tags

## Predefined Tags
Use only the following tags for the MVP.

Workout type:
- `weight`
- `running`
- `cardio`
- `home_training`
- `yoga_pilates`
- `sports`

Intensity:
- `low`
- `medium`
- `high`

Social preference:
- `solo`
- `group`

Experience:
- `beginner`
- `intermediate`

## Matching Rule
Use a simple score-based rule.

Recommended scoring:
- same time slot: `+50`
- same workout type: `+30`
- same intensity: `+10`
- same social preference: `+10`

Return the users with the highest score first.

## MVP Data Shape
Each user can be represented as:

```json
{
  "id": 1,
  "name": "User A",
  "time_slot": "weekday_evening",
  "workout_style_text": "I want medium intensity weight training with a partner",
  "main_category": "weight",
  "intensity": "medium",
  "social_preference": "group",
  "experience": "intermediate"
}
```

## UI for Demo
Minimum screens/components:
- input form
- match result list

Minimum fields:
- time slot select
- workout style text area
- submit button
- result cards

## Suggested Time Slots
Use fixed options for speed:
- `weekday_morning`
- `weekday_afternoon`
- `weekday_evening`
- `weekend_morning`
- `weekend_afternoon`
- `weekend_evening`

## Demo Strategy
For the 25-minute version, it is okay to:
- use mock users
- use local matching logic
- simulate GPT classification with rule-based mapping or a simple stub

If real API integration slows the team down, prioritize a fully working local demo first.

## Team Rule
Each person should work in a separate branch and avoid editing files outside their assigned scope.

Suggested branch names:
- `codex/feat-frontend-form`
- `codex/feat-matching-engine`
- `codex/feat-tag-classifier`
- `codex/feat-demo-data-integration`

## Definition of Done
The MVP is done when:
- a user can input time slot and workout style text
- the text is converted into categories
- at least 3 mock users can be compared
- matched users are displayed in ranked order
- the app runs locally for demo
