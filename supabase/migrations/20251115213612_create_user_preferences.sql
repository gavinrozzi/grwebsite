/*
  # Create User Preferences Table

  ## Purpose
  This migration creates a table to store user preferences including theme selection.
  It enables users to maintain their preferred theme settings across devices and sessions.

  ## Tables Created
  
  ### `user_preferences`
  - `id` (uuid, primary key) - Unique identifier for each preference record
  - `user_id` (uuid, unique, nullable) - Links to authenticated user, null for anonymous users
  - `session_id` (text, unique, nullable) - Tracks preferences for anonymous users
  - `theme` (text, default 'dark') - User's preferred theme ('light' or 'dark')
  - `created_at` (timestamptz) - When the preference was first created
  - `updated_at` (timestamptz) - When the preference was last modified
  
  ## Security
  - Row Level Security (RLS) is enabled on the user_preferences table
  - Authenticated users can view and update only their own preferences
  - Anonymous users can manage preferences using their session_id
  
  ## Indexes
  - Index on user_id for fast lookups by authenticated user
  - Index on session_id for fast lookups by anonymous session
  
  ## Notes
  - Theme defaults to 'dark' to match the current site design
  - Either user_id or session_id must be set, but not both
  - Updated_at is automatically updated via trigger function
*/

CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE,
  session_id text UNIQUE,
  theme text NOT NULL DEFAULT 'dark',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT user_or_session_check CHECK (
    (user_id IS NOT NULL AND session_id IS NULL) OR
    (user_id IS NULL AND session_id IS NOT NULL)
  ),
  CONSTRAINT theme_check CHECK (theme IN ('light', 'dark'))
);

CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_session_id ON user_preferences(session_id);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anonymous users can view own preferences"
  ON user_preferences FOR SELECT
  TO anon
  USING (session_id IS NOT NULL);

CREATE POLICY "Anonymous users can insert own preferences"
  ON user_preferences FOR INSERT
  TO anon
  WITH CHECK (session_id IS NOT NULL AND user_id IS NULL);

CREATE POLICY "Anonymous users can update own preferences"
  ON user_preferences FOR UPDATE
  TO anon
  USING (session_id IS NOT NULL)
  WITH CHECK (session_id IS NOT NULL AND user_id IS NULL);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
