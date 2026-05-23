# DevPulse

A modern issue tracking and management system built with TypeScript and Express.js. DevPulse provides a robust backend API for managing issues, user authentication, and role-based access control.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Role-Based Access Control](#role-based-access-control)
- [Author](#author)

## ✨ Features

- **User Authentication**: Secure signup and login with JWT token-based authentication
- **Issue Management**: Create, read, update, and delete issues with full CRUD operations
- **Role-Based Access Control**: Different permission levels for contributors and maintainers
- **Error Handling**: Comprehensive global error handling middleware
- **CORS Support**: Cross-Origin Resource Sharing enabled for client-side applications
- **Database Integration**: PostgreSQL database with connection pooling
- **Security**: Password encryption using bcrypt, JWT token validation

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript 6.0.3
- **Web Framework**: Express.js 5.2.1
- **Database**: PostgreSQL 8.21.0
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Password Security**: bcrypt 6.0.0
- **HTTP Headers**: CORS 2.8.6
- **Environment Management**: dotenv 17.4.2
- **Build Tool**: tsup 8.5.1
- **Development**: tsx 4.22.3

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- PostgreSQL database server

### Setup Steps

1. **Clone or extract the project**
   ```bash
   cd DevPulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (see [Configuration](#configuration) section)

4. **Build the project**
   ```bash
   npm run build
   ```

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
CONNECTION_STRING=postgresql://username:password@localhost:5432/devpulse
JWT_SECRET=your_secure_jwt_secret_key
```

### Environment Variables Description

- **PORT**: The port on which the server will run (default: 5000)
- **CONNECTION_STRING**: PostgreSQL connection string for database access
- **JWT_SECRET**: Secret key for JWT token generation and verification

## 🚀 Running the Project

### Development Mode
```bash
npm run dev
```
Runs the server in watch mode with hot reload using `tsx`.

### Production Mode
```bash
npm start
```
Runs the compiled JavaScript from the `dist` directory.

### Building for Production
```bash
npm run build
```
Compiles TypeScript to JavaScript using tsup.

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|-----------------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive JWT token | No |

### Issue Routes (`/api/issues`)

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|-----------------|--------------|
| POST | `/api/issues` | Create a new issue | Yes | Contributor/Maintainer |
| GET | `/api/issues` | Get all issues | No | - |
| GET | `/api/issues/:id` | Get a specific issue | No | - |
| PATCH | `/api/issues/:id` | Update an issue | Yes | Contributor/Maintainer |
| DELETE | `/api/issues/:id` | Delete an issue | Yes | Maintainer only |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Server health check and info |

## 📁 Project Structure

```
DevPulse/
├── src/
│   ├── app.ts                    # Express app configuration
│   ├── server.ts                 # Server entry point
│   ├── config/
│   │   └── index.ts              # Environment configuration
│   ├── DB/
│   │   └── index.db.ts           # Database initialization
│   ├── middleware/
│   │   ├── auth.ts               # JWT authentication middleware
│   │   ├── authorizeIssue.ts     # Issue authorization middleware
│   │   ├── requireMaintainer.ts  # Maintainer role check middleware
│   │   ├── globalErrorHandler.ts # Global error handling
│   │   └── index.d.ts            # Type definitions
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts   # Auth business logic
│   │   │   ├── auth.route.ts        # Auth routes
│   │   │   └── auth.service.ts      # Auth services
│   │   ├── issue/
│   │   │   ├── issue.controller.ts  # Issue business logic
│   │   │   ├── issue.interface.ts   # Issue type definitions
│   │   │   ├── issue.route.ts       # Issue routes
│   │   │   └── issue.service.ts     # Issue services
│   │   └── user/
│   │       └── user.interface.ts    # User type definitions
│   ├── types/
│   │   └── types.index.ts        # Global type definitions
│   └── utility/
│       └── sendResponse.ts       # Response formatting utility
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── vercel.json
└── README.md
```

## 🔐 Authentication

DevPulse uses JWT (JSON Web Tokens) for authentication:

1. **Signup**: Create a new user account
   - Password is hashed using bcrypt before storage
   
2. **Login**: Receive a JWT token
   - Token is valid for subsequent authenticated requests
   - Include token in Authorization header: `Authorization: <token>`

3. **Token Validation**: All protected routes verify the JWT token
   - Requests without valid tokens are rejected

## 👥 Role-Based Access Control

The system supports two main roles:

- **Contributor**: Can create and update issues
- **Maintainer**: Full access including deleting issues and managing other contributors

### Permission Matrix

| Action | Contributor | Maintainer |
|--------|-------------|-----------|
| Create Issue | ✅ | ✅ |
| Update Issue | ✅ | ✅ |
| Delete Issue | ❌ | ✅ |
| View Issues | ✅ | ✅ |

## 👨‍💻 Author

**Mishkat Mahabub**

---

**Version**: 1.0.0  
**License**: ISC