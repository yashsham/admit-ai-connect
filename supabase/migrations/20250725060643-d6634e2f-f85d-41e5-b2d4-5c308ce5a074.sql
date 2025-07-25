-- Add missing columns to profiles table for settings functionality
ALTER TABLE public.profiles 
ADD COLUMN college_name TEXT,
ADD COLUMN college_address TEXT,
ADD COLUMN college_website TEXT,
ADD COLUMN notifications_enabled BOOLEAN DEFAULT true,
ADD COLUMN email_alerts BOOLEAN DEFAULT true,
ADD COLUMN sms_alerts BOOLEAN DEFAULT false;