# ManageBlue-Backend
Backend Service for the ManageBlue App.

## Models

**User:**
- username (String 32)*
- hashedPassword (String)*
- salt (String)*
- firstName (String 32)*
- lastName (String 32)*
- email (String 128)*
- auto: createdAt(Date)
- auto: updatedAt(Date)

**Token:**
- token (String)*
- date (Date)*

**Project:**
- title (String 64)*
- description (String 1024)*
- active (Bool)*
- members ([User])*
- auto: createdAt(Date)
- auto: updatedAt(Date)

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

### `/auth`
- `/register` (POST) - Register new user
- `/login` (POST) - Login user
- `/logout` (POST) - Logout user
- `/verify` (GET) - Verify token

### `/users`
- `/:id` (GET) - Return user by ID
- `/` (GET) - Return all users
- `/:id` (PUT) - Update user by ID
- `/pass/:id` (PUT) - Update user password by ID
- `/:id` (DELETE) - Delete user by ID

### `/projects`
- `/:id` (GET) - Return project by ID
- `/` (GET) - Return all projects (matching query parameters)
- `/` (POST) - Create new project
- `/:id` (PUT) - Update project by ID
- `/:id` (DELETE) - Delete project by ID

### `/tasks`
- `/:id` (GET) - Return task by ID
- `/` (GET) - Return all tasks (matching query parameters)
- `/` (POST) - Create new task
- `/:id` (PUT) - Update task by ID
- `/:id` (DELETE) - Delete task by ID

