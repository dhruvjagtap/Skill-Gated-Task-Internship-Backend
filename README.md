# <b>Skill-Gated Task & Internship Backend API</b>
A backend system that enables students to earn and gain experience through skill-verified, short-duration tasks and internships, with strict academic controls, role-based access, and admin-verified workflows.  
 
![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.x-black)
![status](https://img.shields.io/badge/status-Development-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen)

> Note: This project intentionally focuses on backend system design and engineering. Frontend, payments, and large-scale deployment are documented as future extensions to avoid unnecessary scope expansion.

## <b>Project Motivation & Problem Statement</b>

Today, many students seek practical experience and income through freelancing platforms. However, most existing platforms are **unstructured**, **academically unsafe**, and **skill-unverified**. Students often take on open-ended work, compete unfairly, or overwork themselves at the cost of their academics.

At the same time, organizations and startups struggle to find reliable, skill-verified students for short-term tasks and internships without committing to long hiring processes.

This project was created to solve that gap.

The **Skill-Gated Task & Internship Backend API** is designed as a controlled, ethical alternative to traditional freelancing platforms — one that prioritizes **skill verification**, **academic protection**, and **administrative oversight**.

Instead of unrestricted gig work, this platform enforces:

- Verified skills before task access
- Fixed-scope, short-duration work
- Strict limits to protect students’ academic commitments
- Admin-reviewed workflows to ensure fairness and accountability

## <b>Project Goals</b>

The primary goals of this project are:
- To design a real-world backend system with role-based workflows
- To enforce business rules (academic safety, skill gating) at the API level
- To demonstrate secure authentication, authorization, and data modeling
- To simulate how large platforms manage multi-role approvals and lifecycle states

This project focuses heavily on backend architecture, system design, and security, rather than UI or monetization.

## <b>Why I Built This Project</b>

This project was built to:
- Practice production-style backend engineering
- Understand RBAC, admin moderation systems, and approval workflows
- Learn how to implement business constraints beyond CRUD operations
- Showcase the ability to convert a real-world problem into a scalable API design

It reflects how platforms like internship portals, internal task systems, or controlled gig platforms operate behind the scenes.

## What Makes This Project Different?
- Not a generic CRUD or to-do app
- Enforces rules, limits, and approvals
- Multi-role interaction (Student ↔ Organization ↔ Admin)
- Focus on ethics, control, and safety
- Designed to be easily extended into a full production system

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
- Skill verification workflows
- Task & internship management APIs
- Academic protection rules
- Admin approval & moderation logic
- Postman API collection

### Upcoming
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
- Automatic task lock during exam periods (mocked / configurable logic)
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
├── controllers/        Request handlers (business logic)
├── routers/            Express route definitions
├── middlewares/        Auth & role-based guards
├── models/             Mongoose schemas
├── services/           DB & reusable services
├── utils/              Helpers & constants
├── views/              EJS templates
├── index.js            App entry point
├── package.json
└── Skill Gated task & Internship.postman_collection.json

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
git clone https://github.com/dhruvjagtap/Skill-Gated-Task-Internship-Backend.git
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

## Postman API Collection

This repository includes a fully tested Postman collection:

**`Skill Gated task & Internship.postman_collection.json`**

### What’s Included
- Authentication flows (Student / Organization / Admin)
- JWT-protected routes
- Skill verification workflows
- Task & internship lifecycle APIs
- Role-based access validation
- Error & edge-case testing

### How to Use
1. Open Postman
2. Click **Import**
3. Select the JSON file from the repository
4. Set environment variables:
   - `base_url` → `http://localhost:3000`
   - `token` → JWT token after login

This collection can be used by reviewers or developers to test the entire API without manual setup.

## <b>Roadmap</b>

### Phase 1 – Core Backend (Completed)

> **This phase represents the fully functional, internship-ready backend system.**

* [x] JWT-based authentication & role-based access control (Student / Organization / Admin)
* [x] Skill verification & skill-gated task access
* [x] Task & internship lifecycle management
* [x] Secure task application & submission workflow
* [x] Academic safety rules (weekly limits, concurrency limits)
* [x] Admin verification & override controls
* [x] MongoDB transactional task assignment
* [x] Modular MVC architecture

**This phase alone is sufficient for internship evaluation and backend assessment.**

---

### Phase 2 – Developer Experience & Maintainability (In Progress / Optional)

> Improves usability, debugging, and onboarding for developers.

* [x] Postman collection for API testing
* [ ] Swagger (OpenAPI) interactive API documentation
* [ ] Centralized error handling & validation layer
* [ ] Structured logging (optional)

*These enhancements improve clarity but do not affect core functionality.*

---

### Phase 3 – Future Enhancements (Planned, Not Required)

> These features are intentionally deferred to avoid scope creep.

* [ ] Mock payment & payout workflow (extensible design)
* [ ] Notification system (email / in-app – mock)
* [ ] Admin & user dashboards (React / frontend)
* [ ] Platform analytics & reporting

### Phase 4 – Production & Scalability (Conceptual)

> Architectural considerations for real-world deployment.

* [ ] Rate limiting & abuse protection
* [ ] Caching strategies for read-heavy endpoints
* [ ] Dockerized deployment & cloud hosting
* [ ] Health check & monitoring endpoints

## <b>License</b>

This project is licensed under the MIT License.

## <b>Acknowledgements</b>

Built as a backend-focused project to demonstrate real-world system design, security, and role-based workflows.
