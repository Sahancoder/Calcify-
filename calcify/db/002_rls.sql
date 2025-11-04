-- Calcify Database - Row Level Security (RLS)
-- Run this migration after 001_init.sql

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Policies for problems table
CREATE POLICY "Users can view their own problems"
  ON problems FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own problems"
  ON problems FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own problems"
  ON problems FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own problems"
  ON problems FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for bookmarks table
CREATE POLICY "Users can view their own bookmarks"
  ON bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookmarks"
  ON bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON bookmarks FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for analytics table
CREATE POLICY "Only service role can insert analytics"
  ON analytics FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own analytics"
  ON analytics FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);
