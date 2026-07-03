# PharmaFlow Backend

Express.js + TypeScript + MongoDB backend for the PharmaFlow pharmacy management system.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

Update the values:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `FRONTEND_URL`: The URL of your frontend (for CORS)

### 3. Start Development Server
```bash
npm run dev
```

The server will run on `http://localhost:5000` by default.

### 4. Seed Database (Optional)
To populate the database with sample data:
```bash
npx ts-node scripts/seed.ts
```

This creates:
- Admin user: `admin@pharmaflow.com` / `admin123`
- Worker users: `worker1@pharmaflow.com` / `worker123`
- Sample products

## Build for Production
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/logout` - Logout (clears token cookie)
- `GET /api/auth/me` - Get current user info (requires auth)

### Products
- `GET /api/products` - Get all products (optional: `?status=needed` or `?status=ordered`)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product (auth required)
- `PUT /api/products/:id` - Update product (owner or admin)
- `DELETE /api/products/:id` - Delete product (owner only)
- `POST /api/products/:id/order` - Mark product as ordered (admin only)
- `POST /api/products/:id/unorder` - Mark product as needed (admin only)

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Authentication

The API uses JWT tokens stored in HttpOnly cookies. After login, the token is automatically included in requests.

## Error Handling

All endpoints follow a consistent error response format:
```json
{
  "error": "Error message",
  "status": 400
}
```

## Technology Stack

- **Framework**: Express.js 5.x
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT in HttpOnly cookies
- **Validation**: Zod schemas
- **Security**: Helmet, CORS, Rate limiting
- **Password Hashing**: bcryptjs
