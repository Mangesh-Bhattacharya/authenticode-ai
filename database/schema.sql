-- AuthentiCode AI Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    credits INTEGER DEFAULT 15,
    is_premium BOOLEAN DEFAULT FALSE,
    subscription_id VARCHAR(255),
    subscription_status VARCHAR(50),
    stripe_customer_id VARCHAR(255)
);

-- Detection history table
CREATE TABLE detections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(255),
    confidence_score DECIMAL(5,2) NOT NULL,
    analysis_result JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    content_preview TEXT
);

-- Credits transactions table
CREATE TABLE credit_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    description TEXT,
    stripe_payment_intent_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- API usage tracking
CREATE TABLE api_usage (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    endpoint VARCHAR(100) NOT NULL,
    requests_count INTEGER DEFAULT 1,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE detections ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own data" ON users 
    FOR SELECT USING (auth.uid() = id);
    
CREATE POLICY "Users can update own data" ON users 
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for detections table
CREATE POLICY "Users can view own detections" ON detections 
    FOR SELECT USING (auth.uid() = user_id);
    
CREATE POLICY "Users can insert own detections" ON detections 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for credit_transactions table
CREATE POLICY "Users can view own transactions" ON credit_transactions 
    FOR SELECT USING (auth.uid() = user_id);
    
CREATE POLICY "Users can insert own transactions" ON credit_transactions 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for api_usage table
CREATE POLICY "Users can view own usage" ON api_usage 
    FOR SELECT USING (auth.uid() = user_id);
    
CREATE POLICY "Users can insert own usage" ON api_usage 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_detections_user_id ON detections(user_id);
CREATE INDEX idx_detections_created_at ON detections(created_at DESC);
CREATE INDEX idx_credit_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX idx_api_usage_user_date ON api_usage(user_id, date);

-- Function to update user credits
CREATE OR REPLACE FUNCTION update_user_credits(
    user_uuid UUID,
    credit_amount INTEGER,
    transaction_desc TEXT DEFAULT 'Credit update'
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Update user credits
    UPDATE users 
    SET credits = credits + credit_amount,
        updated_at = NOW()
    WHERE id = user_uuid;
    
    -- Insert transaction record
    INSERT INTO credit_transactions (user_id, amount, transaction_type, description)
    VALUES (user_uuid, credit_amount, 
            CASE WHEN credit_amount > 0 THEN 'credit' ELSE 'debit' END,
            transaction_desc);
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check user credits
CREATE OR REPLACE FUNCTION check_user_credits(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
    user_credits INTEGER;
BEGIN
    SELECT credits INTO user_credits FROM users WHERE id = user_uuid;
    RETURN COALESCE(user_credits, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;