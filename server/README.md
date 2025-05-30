# TypeScript Express Project

A Node.js project using TypeScript and Express.js for building REST APIs.

## Prerequisites

- Node.js (v16 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/codermanoj2023/05-initializing-working-typescript-nodejs-project.git
   ```

### Important points without which we can't use this project
- ts-node
- typescript
- tsconfig.json

### Following packages are required to run this project
- express
- dotenv
- cors
- bcryptjs
- jsonwebtoken
- mongoose
- @types/express
- @types/cors
- @types/bcryptjs
- @types/jsonwebtoken
- @types/mongoose
- nodemailer
- @types/nodemailer
- otp-generator

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server with hot-reload:
```bash
npm run dev
```

The server will start at `http://localhost:3000` (or the port specified in your .env file)

## Production Build

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

```
src/
├── index.ts        # Application entry point
├── routes/         # API routes
├── controllers/    # Route controllers
└── models/         # Data models

dist/               # Compiled JavaScript files
```

## Scripts

- `npm run dev`: Start development server with hot-reload
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm test`: Run tests
