# MongoDB Atlas Setup for PharmaFlow

## Step 1: Get Your MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Log in to your account
3. In your cluster, click **Connect**
4. Select **Drivers** → **Node.js** 
5. Copy the connection string (it should look like: `mongodb+srv://username:password@cluster.mongodb.net/pharmaflow?retryWrites=true&w=majority`)

## Step 2: Add the Connection String to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **PharmaFlow** project
3. Click **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `MONGODB_URI`
   - **Value**: Paste your MongoDB Atlas connection string from Step 1
   - **Environments**: Check all (Production, Preview, Development)
5. Click **Save**

## Step 3: Seed the Database

Once `MONGODB_URI` is set in Vercel, run the seed script to populate demo data:

```bash
cd backend
npm run seed
```

This will create:
- **Admin user**: admin@pharmaflow.com / admin123
- **Worker users**: worker1@pharmaflow.com / worker123 and worker2@pharmaflow.com / worker123
- **Sample products**: 3 sample pharmacy products (mix of needed and ordered statuses)

## Step 4: Deploy to Vercel

After seeding, deploy your project to Vercel:

```bash
git add .
git commit -m "Add MongoDB Atlas configuration"
git push
```

Your Vercel deployment will automatically use the `MONGODB_URI` from the environment variables you set.

## Troubleshooting

**If the seed script fails:**

1. Verify `MONGODB_URI` is correctly set in Vercel Settings
2. Ensure your MongoDB Atlas cluster allows network access from Vercel's IP addresses (go to Network Access → Add IP Address → Allow Access from Anywhere, or configure specific IPs)
3. Check that the database user credentials in the connection string are correct

**If login still doesn't work after seeding:**

1. Clear your browser cache and localStorage
2. The app falls back to mock authentication with demo credentials, so login should work regardless
3. Check the browser console (F12) for any error messages
