# <b>Skill-Gated Task & Internship Backend API</b>
A backend system that enables students to earn and gain experience through skill-verified, short-duration tasks and internships, with strict academic controls, role-based access, and admin-verified workflows.  
 
![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.x-black)
![status](https://img.shields.io/badge/status-Development-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen)

  ## <b>Features</b> 
  
- JWT-based Authentication & Role-Based Access Control (RBAC) 
- Skill verification system with admin approval  
- Student, Organization, Admin roles
- Skill-gated task & internship applications
- Task lifecycle management (create → apply → submit → review)
- Academic protection rules (task limits, exam lock)
- Secure APIs with validation, rate limiting & hashing
- Admin dashboard APIs for monitoring & control

## <b>Project Status</b>

**Active Development**

### Completed
- EJS-based UI (Landing, Register, Login)
- JWT authentication for:
  - Student
  - Organization
  - Admin
- Role-based access control (RBAC)
- Secure password hashing (bcrypt)
- Environment-based configuration

### In Progress
- Skill verification workflows
- Task & internship management APIs
- Academic protection rules
- Admin approval & moderation logic

### Upcoming
- Postman API collection
- Swagger (OpenAPI) documentation


## <b>Tech Stack</b>

| Service         | Tech Used                               |
| --------------- | --------------------------------------- |
| Backend         | Node.js, Express.js                     |
| Frontend        | ejs                 |
| Database        | MongoDB (Mongoose)                      |
| Authentication  | JWT                                     |
| Security        | bcrypt, input validation, rate limiting |                             |
| Architecture    | MVC + modular structure                 |


## <b>User Roles & Capabilities</b>

### Student
- Register & manage profile
- Add skills & request verification
- Apply to skill-gated tasks
- Submit completed work
- View task status & history

### Organization
- Create organization profile
- Post tasks & internships
- Review applicants
- Accept/reject submissions

### Admin
- Verify student skills
- Approve/reject tasks
- Monitor users & activity
- Enforce platform rules
- Suspend or block users

## <b>Task Lifecycle</b>
Created → Open → In Progress → Submitted → Approved / Rejected

<i>Only students with verified required skills can apply.</i>

## <b>Academic Protection Rules</b>

- Max tasks per student per week
- Max concurrent active tasks
- Automatic task lock during exam periods (mocked logic)
- Applications rejected if limits exceeded

## <b>API Overview </b>

### Authentication
```
POST /api/auth/register

POST /api/auth/login
```

### Student
```
POST /api/students/profile

POST /api/students/skills

POST /api/tasks/:id/apply

POST /api/tasks/:id/submit
```

### Organization
```
POST /api/org/tasks

GET /api/org/tasks/applicants

POST /api/org/submissions/review
```
### Admin

```
GET /api/admin/users

POST /api/admin/skills/verify

POST /api/admin/tasks/approve

POST /api/admin/users/block
```
<i>All protected routes require JWT authentication.</i>

## <b>Project Structure</b>
```
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── utils/
├── views/
├── index.js
└── server.js
```
## <b>Environment Variables</b>

Create a .env file:
```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## <b>Getting Started</b>

**Step 1**: Clone the repository
```
git clone https://github.com/your-username/skill-gated-backend.git
cd skill-gated-backend
```

**Step 2**:Install dependencies
```
npm install
```

**Step 3**:Run the server
```
npm run dev
```

Server will run at http://localhost:3000


## <b>Testing</b>
- API tested using Postman
- Manual role-based testing
- Validation & error scenarios covered

## <b>Roadmap</b>

### Phase 1 – Core Backend (Current)
- [x] Authentication & RBAC 
- [ ] Skill verification system
- [ ] Task & internship lifecycle
- [ ] Academic safety rules

### Phase 2 – Developer Experience
- [ ] Postman collection for API testing
- [ ] Swagger (OpenAPI) documentation
- [ ] Centralized error & logging improvements

### Phase 3 – Platform Expansion
- [ ] Payment integration (mock → real)
- [ ] Notification system (email / in-app)
- [ ] React-based admin & user dashboards
- [ ] Advanced analytics & reporting

### Phase 4 – Production Readiness
- [ ] Rate limit tuning
- [ ] Caching strategies
- [ ] Deployment (Docker / cloud)


## <b>License</b>

This project is licensed under the MIT License.

## <b>Acknowledgements</b>

Built as a backend-focused project to demonstrate real-world system design, security, and role-based workflows.
