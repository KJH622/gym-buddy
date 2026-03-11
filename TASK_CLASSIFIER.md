# Classifier Task

## Owner
Tag classifier agent

## Goal
Convert workout style free-text into predefined categories.

## Scope
Primary file:
- `script.js`

If conflict risk is high, isolate the classifier in a small helper file.

## Allowed Categories
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

## MVP Rule
For this sprint, a rule-based classifier is acceptable.

Example keyword mapping:
- `weight`, `gym`, `lifting` -> `weight`
- `run`, `running`, `jogging` -> `running`
- `home`, `home workout` -> `home_training`
- `yoga`, `pilates` -> `yoga_pilates`
- `soccer`, `basketball`, `tennis` -> `sports`
- `light`, `easy` -> `low`
- `hard`, `intense` -> `high`
- `with people`, `together`, `partner` -> `group`

## Expected Function Shape
Create or expose a function similar to:

```js
classifyWorkoutStyle(text)
```

Expected output:

```json
{
  "main_category": "weight",
  "intensity": "medium",
  "social_preference": "group",
  "experience": "intermediate"
}
```

## Done When
- free-text input is converted to stable predefined tags
- unknown input still returns safe defaults
