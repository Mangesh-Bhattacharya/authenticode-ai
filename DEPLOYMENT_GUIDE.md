# 🚀 Step-by-Step Deployment Guide

## **Step 1: Get Your API Keys**

### Required API Keys:
1. **GPTZero**: https://gptzero.me/api
2. **Copyleaks**: https://copyleaks.com/api  
3. **Hive Moderation**: https://thehive.ai/api
4. **Stripe**: https://dashboard.stripe.com/apikeys

---

## **Step 2: Deploy Frontend to Vercel**

### Option A: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mangesh-Bhattacharya/authenticode-ai&project-name=authenticode-ai&repository-name=authenticode-ai)

### Option B: Manual Deploy
1. **Connect GitHub to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import `Mangesh-Bhattacharya/authenticode-ai`
   - Set Root Directory: `frontend`

2. **Environment Variables in Vercel:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
   ```

3. **Deploy Settings:**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

---

## **Step 3: Deploy Backend to Render**

1. **Create Render Account:** [render.com](https://render.com)

2. **Create Web Service:**
   - Connect GitHub repository
   - Name: `authenticode-ai-backend`
   - Root Directory: `backend`
   - Environment: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Environment Variables in Render:**
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   SECRET_KEY=your_super_secret_jwt_key_here
   GPTZERO_API_KEY=your_gptzero_key
   COPYLEAKS_API_KEY=your_copyleaks_key
   COPYLEAKS_EMAIL=your_copyleaks_email
   HIVE_API_KEY=your_hive_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ENVIRONMENT=production
   ```

---

## **Step 4: Setup Stripe**

1. **Create Products in Stripe Dashboard:**
   - Credits Pack: $5.00 (one-time)
   - Personal Plan: $19.00/month (recurring)
   - Team Plan: $49.00/month (recurring)

2. **Setup Webhook:**
   - URL: `https://your-backend.onrender.com/api/payment/webhook`
   - Events: `checkout.session.completed`, `invoice.payment_succeeded`

3. **Get Price IDs:**
   - Copy price IDs and add to Render environment variables

---

## **Step 5: Database Setup**

1. **Run Schema in Supabase:**
   - Copy content from `database/schema.sql`
   - Run in Supabase SQL Editor

2. **Enable Authentication:**
   - Go to Authentication → Settings
   - Enable Email authentication
   - Set Site URL to your Vercel domain

---

## **Step 6: Final Configuration**

1. **Update Frontend API URL:**
   - In Vercel, set `NEXT_PUBLIC_API_URL` to your Render backend URL

2. **Test the Flow:**
   - Visit your Vercel frontend URL
   - Sign up for an account
   - Upload a test file
   - Check detection works
   - Test payment flow

---

## **Step 7: Custom Domain (Optional)**

1. **Add Domain to Vercel:**
   - Go to Project Settings → Domains
   - Add your custom domain

2. **Update CORS:**
   - Add your domain to `ALLOWED_ORIGINS` in backend config

---

## **🎉 You're Live!**

Your AuthentiCode AI is now deployed and ready to detect AI-generated code!

### **URLs:**
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **API Docs**: `https://your-backend.onrender.com/docs`

### **Next Steps:**
- Monitor usage in dashboards
- Set up analytics
- Add monitoring/alerts
- Scale as needed

### **Support:**
- Check logs in Vercel/Render dashboards
- Monitor Supabase database
- Track payments in Stripe
- Review API usage patterns