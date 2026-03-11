# Integration Task

## Owner
Integration / data agent

## Goal
Prepare mock data and connect the flow end-to-end for the demo.

## Scope
Primary file:
- `script.js`

Optional:
- lightweight sample data file if it helps reduce merge conflicts

## Responsibilities
- create at least 5 mock user profiles
- ensure each profile includes:
  - `id`
  - `name`
  - `time_slot`
  - `main_category`
  - `intensity`
  - `social_preference`
  - `experience`
- connect classifier -> matcher -> UI rendering

## Demo Expectation
The user should be able to:
1. enter form data
2. submit
3. see ranked matches immediately

## Priority
- end-to-end working flow
- no broken JavaScript
- no backend dependency

## Done When
- the app works locally with mock data
- the demo can be shown without extra setup
