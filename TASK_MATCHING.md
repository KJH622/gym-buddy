# Matching Task

## Owner
Matching logic agent

## Goal
Implement the matching score logic for similar users.

## Scope
Primary file:
- `script.js`

If needed, create a very small helper file only if it reduces conflicts.

## Matching Requirements
Use the following scoring:
- same time slot: `+50`
- same workout type: `+30`
- same intensity: `+10`
- same social preference: `+10`

## Expected Function Shape
Create or expose a function similar to:

```js
matchUsers(currentUser, candidateUsers)
```

Expected behavior:
- receives classified current user data
- compares against mock user list
- returns sorted results by highest score

## Notes
- keep the algorithm deterministic
- keep the implementation simple
- include score in output so frontend can display it if useful

## Done When
- matching results are correctly ranked
- logic can run locally with mock users
