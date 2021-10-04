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

**Token:**
- token (String)*
- date (Date)*

**Project:**
- title (String 32)*
- description (String 1024)*
- isActive (Bool)*
- members ([User])*

**Task:**
- title (String 32)*
- note (String 1024)*
- hours (Number)*
- project (Project)*
- date (Date)*
- contributor (User)*
- timestamp(Date)*
- completed (Bool)*
- paid (Bool)*

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

### `/project`
- `/:id` (GET) - Return project by ID
- `/` (GET) - Return all projects (matching parameters)
- `/` (POST) - Create new project
- `/:id` (PUT) - Update project by ID
- `/:id` (DELETE) - Delete project by ID

### `/task`
- `/:id` (GET) - Return task by ID
- `/` (GET) - Return all tasks (matching parameters)
- `/` (POST) - Create new task
- `/:id` (PUT) - Update task by ID
- `/:id` (DELETE) - Delete task by ID

