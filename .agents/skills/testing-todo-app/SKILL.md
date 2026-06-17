---
name: testing-todo-app
description: Test the todo app end-to-end. Use when verifying UI interactions, localStorage persistence, or any changes to the todo app.
---

# Testing the Todo App

## Overview
This is a static HTML/CSS/JS app with no build step, no server, and no external dependencies.

## How to Run
Open `index.html` directly in a browser via `file:///` path. No dev server or npm install required.

```
file:///home/ubuntu/todo-app/index.html
```

## Key UI Elements
- **Input field**: `#todo-input` with placeholder "Add a new task..."
- **Add button**: Submit button in the form
- **Task items**: `<li>` elements inside `#todo-list`, each with a checkbox, text span, and × delete button
- **Footer**: Hidden when no tasks. Shows "X task(s) remaining" and a "Clear Completed" button

## Core Test Flows

### 1. Add Task
- Type text in input, press Enter or click "Add"
- **Expected**: Task appears in list with unchecked checkbox, input clears, footer shows count
- **Edge case**: Empty/whitespace-only input is silently rejected (no task added)

### 2. Toggle Completion
- Click checkbox next to a task
- **Expected**: Text gets strikethrough style, checkbox becomes checked, remaining count decrements
- Toggle again to uncomplete

### 3. Delete Task
- Click the × button on a task
- **Expected**: Task removed from list entirely, counter updates

### 4. Clear Completed
- Click "Clear Completed" button in footer
- **Expected**: Only completed tasks are removed, active tasks remain

### 5. localStorage Persistence
- Add some tasks, then refresh (F5)
- **Expected**: All tasks and their completion state survive the reload
- **If broken**: List would be empty after refresh

## Data Storage
Tasks are stored in `localStorage` under key `todos` as a JSON array of `{text, completed}` objects.

## Devin Secrets Needed
None — this is a fully static app with no authentication or external services.

## Tips
- The footer is completely hidden (`display: none`) when there are zero tasks
- Counter uses singular "task" vs plural "tasks" based on remaining count
- The app uses vanilla JS (no framework) — DOM is fully re-rendered on each state change
