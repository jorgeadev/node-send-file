# Node Send File

A RESTful API built with **TypeScript**, Node.js, Express, and MongoDB for user authentication and management.

## Features

- 🔐 User registration with password hashing (bcrypt)
- 🎫 JWT-based authentication
- ✅ Request validation with express-validator
- 🗄️ MongoDB database with Mongoose ODM
- 📝 Full TypeScript support with strict mode
- 🔄 Hot reload development with tsx

## Tech Stack

| Technology | Version |
|------------|---------|
| Node.js | 18+ |
| TypeScript | 5.9.x |
| Express | 5.2.1 |
| MongoDB | 7.0 |
| Mongoose | 9.1.6 |

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Atlas account or local MongoDB instance
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/jorgeadev/node-send-file.git
cd node-send-file

# Install dependencies
pnpm install

# Create environment file
cp .env-template .env
```

### Environment Variables

Edit `.env` with your configuration:

```env
DB_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>"
PORT="4000"
SECRET="your-jwt-secret-key"
```

### Running the Server

```bash
# Development (with hot reload)
pnpm run dev

# Build TypeScript
pnpm run build

# Production
pnpm start
```

Server will start at `http://localhost:4000`

## API Endpoints

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Register a new user |

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth` | Login user |
| GET | `/api/auth` | Verify JWT token |

**Login Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Project Structure

```
node-send-file/
├── src/
│   ├── config/
│   │   └── db.ts           # MongoDB connection
│   ├── controllers/
│   │   ├── authController.ts
│   │   └── userController.ts
│   ├── models/
│   │   └── User.ts         # User schema + interface
│   ├── routes/
│   │   ├── auth.ts
│   │   └── users.ts
│   └── index.ts            # Entry point
├── dist/                   # Compiled JavaScript
├── tsconfig.json
└── package.json
```

## Scripts

```bash
pnpm run dev      # Start development server (tsx)
pnpm run build    # Compile TypeScript to dist/
pnpm start        # Start production server
pnpm run lint     # Run ESLint
pnpm run lint:fix # Fix ESLint errors
```

## License

MIT © [Jorge A. Gomez](https://github.com/jorgeadev)
