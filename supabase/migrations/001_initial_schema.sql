-- GrittyOS Initial Schema
-- Run this migration in your Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Waitlist signups table
CREATE TABLE IF NOT EXISTS waitlist_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  trade_type TEXT,
  company_name TEXT,
  referral_source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_signups_email ON waitlist_signups(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_signups_created_at ON waitlist_signups(created_at DESC);

-- Investor interests table (optional)
CREATE TABLE IF NOT EXISTS investor_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  firm TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on investor interests email
CREATE INDEX IF NOT EXISTS idx_investor_interests_email ON investor_interests(email);

-- Row Level Security (RLS) policies
-- Enable RLS on tables
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_interests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to insert into waitlist
CREATE POLICY "Allow anonymous waitlist signups" ON waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow anonymous users to insert investor interests
CREATE POLICY "Allow anonymous investor interests" ON investor_interests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Note: Select, Update, Delete policies are intentionally not created
-- to prevent public access to waitlist data. Use the Supabase dashboard
-- or authenticated service role to view/manage signups.
