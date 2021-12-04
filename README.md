# ManageBlue-Microservice-Tasks
Backend microservice for tasks of the ManageBlue App.

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

## API (`/api/version`)

### `/tasks`
- `/:id` (GET) - Return task by ID
- `/` (GET) - Return all tasks (matching query parameters)
- `/` (POST) - Create new task
- `/:id` (PUT) - Update task by ID
- `/:id` (DELETE) - Delete task by ID
- `/deleteProject/:id` (DELETE) - Delete all tasks of project with project ID

## CONFIG ENV variables
- `PORT` - server port
- `URL` - url to server
- `MONGODB_CLOUD_URI` - url to mongodb
- `JWT_SECRET` - jwt secret

