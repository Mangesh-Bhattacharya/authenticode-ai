# AuthentiCode AI - Deployment Guide

## 🚀 Quick Deploy

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- Supabase account
- Stripe account
- API keys for GPTZero, Copyleaks, Hive

### 1. Frontend Deployment (Vercel)

```bash
cd frontend
npm install
npm run build
```

Deploy to Vercel:
```bash
npx vercel --prod
```

Environment variables for Vercel:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### 2. Backend Deployment (Render)

```bash
cd backend
pip install -r requirements.txt
```

Deploy to Render with these environment variables:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
SECRET_KEY=your_jwt_secret_key
GPTZERO_API_KEY=your_gptzero_key
COPYLEAKS_API_KEY=your_copyleaks_key
COPYLEAKS_EMAIL=your_copyleaks_email
HIVE_API_KEY=your_hive_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
REDIS_URL=redis://your-redis-url:6379
```

### 3. Database Setup (Supabase)

Run these SQL commands in Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    credits INTEGER DEFAULT 15,
    is_premium BOOLEAN DEFAULT FALSE,
    subscription_id VARCHAR(255),
    subscription_status VARCHAR(50)
);

-- Detection history table
CREATE TABLE detections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(255),
    confidence_score DECIMAL(5,2) NOT NULL,
    analysis_result JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Credits transactions table
CREATE TABLE credit_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE detections ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own detections" ON detections FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own detections" ON detections FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own transactions" ON credit_transactions FOR SELECT USING (auth.uid() = user_id);
```

### 4. Stripe Setup

1. Create products in Stripe Dashboard:
   - Credits Pack: $5 for 100 credits
   - Personal Plan: $19/month
   - Team Plan: $49/month

2. Set up webhook endpoint: `https://your-backend-url.com/api/payment/webhook`

3. Add webhook events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

### 5. API Keys Setup

Get API keys from:
- **GPTZero**: https://gptzero.me/api
- **Copyleaks**: https://copyleaks.com/api
- **Hive**: https://thehive.ai/api

## 🔧 Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Environment Setup
1. Copy `.env.example` to `.env`
2. Fill in all required values
3. Run database migrations
4. Start both frontend and backend

## 📊 Monitoring

- **Frontend**: Vercel Analytics
- **Backend**: Render metrics + custom logging
- **Database**: Supabase dashboard
- **Payments**: Stripe dashboard
- **Errors**: Sentry (optional)

## 🔒 Security Checklist

- [ ] Environment variables secured
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] File upload validation
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] HTTPS enforced
- [ ] API keys rotated regularly

## 📈 Scaling Considerations

- **Redis**: For caching and rate limiting
- **CDN**: For static assets
- **Load Balancer**: For multiple backend instances
- **Database**: Connection pooling
- **File Storage**: S3 for large files
- **Monitoring**: APM tools