# PharmaFlow - Pharmacy Management System

A modern, full-stack web application for managing pharmacy product orders efficiently. Features a clean, mobile-first interface and robust backend API.

## Quick Start

### Prerequisites
- Node.js 18+ or pnpm
- MongoDB running locally or a remote connection string
- Backend and frontend separated for easy deployment

### Frontend Setup

1. **Install dependencies**
```bash
pnpm install
```

2. **Configure environment**
```bash
cp .env.example .env.local
```

Update `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

3. **Start development server**
```bash
pnpm dev
```

The frontend will run on `http://localhost:3000`

### Backend Setup

1. **Navigate to backend**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
```

Update `.env`:
```
MONGODB_URI=mongodb://localhost:27017/pharmaflow
JWT_SECRET=your_secure_random_string_here
FRONTEND_URL=http://localhost:3000
PORT=5000
NODE_ENV=development
```

4. **Seed database (optional)**
```bash
npx ts-node scripts/seed.ts
```

This creates:
- Admin: `admin@pharmaflow.com` / `admin123`
- Worker 1: `worker1@pharmaflow.com` / `worker123`
- Worker 2: `worker2@pharmaflow.com` / `worker123`
- Sample products

5. **Start backend**
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## Project Structure

### Frontend (`/`)
```
app/
  (auth)/login       - Authentication page
  (app)/             - Protected routes
    needed/          - Products needed
    ordered/         - Products ordered
    users/           - User management (admin only)
components/          - Reusable UI components
lib/                 - Utilities and helpers
  api.ts            - Axios API client
  auth-context.tsx  - Authentication state
  queries.ts        - TanStack Query hooks
types/              - TypeScript definitions
```

### Backend (`/backend`)
```
src/
  models/           - Mongoose schemas
  controllers/      - Request handlers
  routes/           - API endpoints
  services/         - Business logic
  middlewares/      - Express middleware
  validators/       - Zod schemas
  config/           - Database & JWT config
  types/            - TypeScript types
scripts/
  seed.ts          - Database seeding script
```

## Features

### Authentication
- Email/password login with JWT tokens
- HttpOnly cookies for secure token storage
- Admin and Worker roles with different permissions
- Session management with automatic refresh

### Product Management
- Create, read, update, delete products
- Mark products as "needed" or "ordered" (admin only)
- Real-time product list updates
- Search and filter products
- Relative timestamps (e.g., "Added 5 minutes ago")

### User Management (Admin Only)
- View all users with roles and creation dates
- Create new worker and admin accounts
- Delete users (cannot delete own account)
- Role-based access control

### UI/UX
- Responsive design (mobile-first, works at 320px-1440px)
- Bottom navigation on mobile, sidebar on desktop
- Floating action buttons for quick actions
- Empty states and loading skeletons
- Toast notifications for all actions
- Smooth animations with Framer Motion
- Color-coded product status (orange for needed, green for ordered)

## Technologies

### Frontend
- **Framework**: Next.js 16 with App Router
- **UI**: shadcn/ui + Tailwind CSS
- **State**: React Context + TanStack Query
- **Forms**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **HTTP**: Axios with cookie support
- **Notifications**: Sonner toast

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose
- **Auth**: JWT with HttpOnly cookies
- **Validation**: Zod schemas
- **Security**: Helmet, CORS, Rate limiting
- **Hashing**: bcryptjs for passwords

## API Endpoints

See `backend/README.md` for complete API documentation.

### Key Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `GET/POST /api/products` - List/create products
- `PUT/DELETE /api/products/:id` - Update/delete product
- `POST /api/products/:id/order` - Mark as ordered (admin)
- `GET/POST /api/users` - List/create users (admin)

## Deployment

### Frontend (Vercel)
```bash
# Already configured for Vercel deployment
# Push to GitHub, connect to Vercel, it auto-deploys
```

### Backend (Node.js Hosting)
Recommended platforms:
- Render
- Railway
- Heroku
- AWS Elastic Beanstalk
- DigitalOcean App Platform

Build and start:
```bash
npm run build
npm start
```

## Development

### Adding a new feature
1. Create component in `/components`
2. Add API call in `lib/queries.ts` if needed
3. Create page/route in `app/` directory
4. Add backend route/controller if needed

### Styling guidelines
- Use Tailwind utility classes
- Leverage semantic design tokens
- Mobile-first approach
- Keep consistent spacing with gap classes

### Code quality
- TypeScript for type safety
- ESLint for linting
- Component separation for reusability
- Proper error handling with toasts

## Environment Variables

### Frontend
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend
```
MONGODB_URI=mongodb://localhost:27017/pharmaflow
JWT_SECRET=your_secure_secret
FRONTEND_URL=http://localhost:3000
PORT=5000
NODE_ENV=development
```

## Troubleshooting

### Backend won't start
- Ensure MongoDB is running
- Check MongoDB connection string
- Verify all environment variables are set

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS settings in backend

### Authentication issues
- Clear browser cookies
- Check JWT_SECRET matches between backend and auth logic
- Verify email/password credentials

## Support

For issues or questions, check:
1. Backend README for API details
2. shadcn/ui documentation for component usage
3. Next.js documentation for routing/deployment
4. MongoDB documentation for database issues

## License

MIT
