# Vercel Environment Variables Setup

## Problem
The frontend is calling `http://localhost:5000/api/` instead of the Render backend at `https://pharmacy-product-platform.onrender.com`.

This happens because the `NEXT_PUBLIC_API_URL` environment variable is not set in your Vercel project.

## Solution: Add Environment Variable to Vercel

### Step 1: Go to Vercel Project Settings
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your **pharmacy-product-platform** project
3. Click **Settings** in the top navigation

### Step 2: Add Environment Variable
1. In the left sidebar, click **Environment Variables**
2. Click **Add New** 
3. Fill in the following:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://pharmacy-product-platform.onrender.com`
   - **Environments**: Select all (Production, Preview, Development)
4. Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click the **three dots** on your latest deployment
3. Select **Redeploy**
4. Click **Redeploy** to confirm

The environment variable will now be available to your deployed frontend.

## Verification

After redeploying, open the browser console (F12) and check the console output:
```
[v0] API URL configured: https://pharmacy-product-platform.onrender.com
```

If you see `http://localhost:5000`, the environment variable wasn't properly set or the build cache needs to be cleared.

## Local Development

For local development, create a `.env.local` file (already done):
```
NEXT_PUBLIC_API_URL=https://pharmacy-product-platform.onrender.com
```

This file is NOT deployed to Vercel - it's only for local development.

## Troubleshooting

If the URL is still `localhost:5000` after redeploying:

1. **Clear Vercel cache**: 
   - Go to Settings → Git
   - Click **Disconnect**
   - Reconnect and push a new commit to trigger a fresh build

2. **Check that the env var is set**:
   - In Vercel Settings → Environment Variables
   - Verify `NEXT_PUBLIC_API_URL` is listed
   - Verify it's enabled for your current environment (Production/Preview)

3. **Check build logs**:
   - Go to Deployments
   - Click your latest deployment
   - Check the build logs for any errors

## Summary

The `NEXT_PUBLIC_` prefix in Next.js makes environment variables available to the browser. Without setting `NEXT_PUBLIC_API_URL` in Vercel, the fallback value `http://localhost:5000` is used instead.
