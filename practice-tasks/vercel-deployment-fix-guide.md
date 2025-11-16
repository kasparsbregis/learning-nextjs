# Fixing Vercel Deployment Issues - Prisma & Database

## Problem

Your API works locally but returns 500 errors on Vercel. This is usually due to:

1. **Missing Environment Variables** - `DATABASE_URL` not set in Vercel
2. **Prisma Client Not Generated** - Missing `postinstall` script
3. **Connection Pooling** - Neon requires special connection string for serverless
4. **Prisma Logging** - Can cause issues in production

---

## ✅ Fixes Applied

### 1. Added `postinstall` Script

**File: `package.json`**

```json
"scripts": {
  "postinstall": "prisma generate"
}
```

This ensures Prisma Client is generated during Vercel's build process.

### 2. Updated Prisma Client Configuration

**File: `lib/prisma.ts`**

- Disabled query logging in production (only logs errors)
- This prevents performance issues and reduces log noise

### 3. Enhanced Error Logging

**File: `app/api/players/route.ts`**

- Added detailed error logging to help debug issues
- Checks if `DATABASE_URL` is set

---

## 🔧 Steps to Fix Vercel Deployment

### Step 1: Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add your `DATABASE_URL`:

   **For Neon Database (Recommended for Serverless):**
   
   Your Neon dashboard provides two connection strings:
   - **Direct Connection** - For local development
   - **Connection Pooler** - For serverless/production (use this!)

   **Format:**
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require&pgbouncer=true
   ```

   **Important:** Make sure you're using the **Connection Pooler** URL, not the direct connection URL. It should include `pgbouncer=true` or be from the pooler endpoint.

4. Set the environment variable:
   - **Key:** `DATABASE_URL`
   - **Value:** Your Neon connection pooler URL
   - **Environment:** Production, Preview, Development (select all)

### Step 2: Verify Your Neon Connection String

**In Neon Dashboard:**

1. Go to your Neon project
2. Click on **Connection Details**
3. Look for **Connection Pooler** section
4. Copy the connection string that includes `?pgbouncer=true` or uses the pooler endpoint

**Example:**
```
postgresql://user:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true
```

### Step 3: Redeploy on Vercel

After setting environment variables:

1. Go to **Deployments** tab in Vercel
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger a new deployment

---

## 🧪 Testing the Fix

### Check Vercel Logs

1. Go to your Vercel project
2. Click on **Deployments**
3. Click on the latest deployment
4. Click **View Function Logs**
5. Look for any errors related to:
   - Prisma Client
   - Database connection
   - Missing environment variables

### Test the API Endpoint

Visit: `https://your-app.vercel.app/api/players`

**Expected Response:**
```json
[
  {
    "id": 1,
    "name": "Player Name",
    "age": 25,
    ...
  }
]
```

**If you still get 500 error:**
- Check Vercel function logs for the actual error message
- Verify `DATABASE_URL` is set correctly
- Make sure you're using the connection pooler URL

---

## 🔍 Common Issues & Solutions

### Issue 1: "Prisma Client has not been initialized"

**Solution:**
- The `postinstall` script should fix this
- Make sure it's in your `package.json`
- Redeploy on Vercel

### Issue 2: "Can't reach database server"

**Solution:**
- Check if `DATABASE_URL` is set in Vercel
- Verify you're using the **Connection Pooler** URL (not direct connection)
- Make sure the URL includes `?pgbouncer=true` or uses pooler endpoint

### Issue 3: "Connection timeout"

**Solution:**
- Use Neon's Connection Pooler (required for serverless)
- Direct connections don't work well with Vercel's serverless functions

### Issue 4: Environment variable not found

**Solution:**
- Make sure `DATABASE_URL` is set for **all environments** (Production, Preview, Development)
- Redeploy after adding environment variables

---

## 📝 Quick Checklist

Before deploying to Vercel:

- [ ] `DATABASE_URL` is set in Vercel environment variables
- [ ] Using **Connection Pooler** URL (not direct connection)
- [ ] `postinstall` script is in `package.json`
- [ ] Prisma Client logging is disabled in production
- [ ] Tested locally with the same connection string

---

## 🚀 Alternative: Using Neon Serverless Driver

If you continue having issues, you can use Neon's serverless driver:

1. Install: `npm install @neondatabase/serverless`
2. Create a new Prisma client wrapper that uses the serverless driver

But the connection pooler URL should work fine for most cases.

---

## 📚 Additional Resources

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Neon Connection Pooling](https://neon.tech/docs/connect/connection-pooling)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

---

## Need Help?

If you're still getting errors:

1. Check Vercel function logs for the exact error message
2. Verify your `DATABASE_URL` format
3. Test the connection string locally
4. Make sure all environment variables are set correctly

The most common issue is using the **direct connection URL** instead of the **connection pooler URL** for serverless environments.

