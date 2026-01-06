## Day 1 – Auth & SSR

### Completed
- Project set up
- Designed schemas for Student, Organization, Admin
- Implemented register & login
- JWT auth middleware
- Role-based access
- EJS SSR setup
- EJS UI of home, register & login

### Issues Faced
- Confusion around role-based middleware

### Learnings
- Why RBAC must be middleware-based
- SSR helps reduce frontend dependency

### Next Plan
- Task model
- Skill verification flow

## Day 2 – Completed all the necessary routes

### Completed
- Admin Routes
- Student Routes
- Organization Routes
- Skill verification flow
- Task model

### Issues Faced
- Overhead due to SSR

### Learnings
- Requets (req, res)
- MongoDB Transaction & Locking

### Next Plan
- API Testing
- Removing SSR making clean Rest API

## Day 3 – Completed all the necessary routes

### Completed
- Removed SSR
- Refactored all the routes, middlewares and controllers

### Issues Faced
- None

### Learnings
- Clean API

### Next Plan
- API Testing

## Day 4 – Completed Task Life cycle

### Completed
- Student can sumbit task
- Organization can review submitted task
- Admin can override the submitted task if organization does not review it.

### Issues Faced
- None

### Learnings
- Clean API

### Next Plan
- API Testing

## Day 5 – API testing

### In progress
- Manual API testing

### Issues Faced
- Do not use ._id when accessing data from req

### Learnings
- Never do too many things on a single day.

### Next Plan
- API Testing

## Day 6 – API testing

### In progress
- Manual API testing

### Issues Faced
- Doing transactions on Mongod instead use mongos or replica set members

### Learnings
- Take care of replica if implemented transactions

### Next Plan
- API Testing

## Day 7 – Completed API testing

### Completed API testing
- Manual API testing

### Issues Faced
- Doing transactions on Mongod instead use mongos or replica set members

### Learnings
- The more you test the better will be your application

### Next Plan
- Swagger (OpenAPI) documentation