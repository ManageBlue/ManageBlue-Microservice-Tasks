# ManageBlue-Backend
Backend Service for the ManageBlue App.

## Models

**Task:**
- title (String 64)*
- note (String 1024)*
- hours (Number)*
- hourlyRate (Number)*
- project (Project)*
- date (Date)*
- contributor (User)*
- completed (Bool)*
- paid (Bool)*
- auto: createdAt(Date)
- auto: updatedAt(Date)

## API (`/api`)

### `/tasks`
- `/:id` (GET) - Return task by ID
- `/` (GET) - Return all tasks (matching query parameters)
- `/` (POST) - Create new task
- `/:id` (PUT) - Update task by ID
- `/:id` (DELETE) - Delete task by ID

