/*
  # Smart Parent AI - Onboarding Schema

  1. New Tables
    - `parents`
      - `id` (uuid, primary key)
      - `google_id` (text, unique)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `created_at` (timestamp)
    
    - `children`
      - `id` (uuid, primary key)
      - `parent_id` (uuid, foreign key)
      - `first_name` (text)
      - `last_name` (text)
      - `dob` (date)
      - `grade` (text)
      - `board` (text)
      - `subjects` (jsonb)
      - `created_at` (timestamp)
    
    - `preferences`
      - `id` (uuid, primary key)
      - `parent_id` (uuid, foreign key)
      - `language_preference` (text, default 'English')
      - `notifications_on` (boolean, default true)
      - `whatsapp_on` (boolean, default false)
      - `created_at` (timestamp)
    
    - `activity_log`
      - `id` (uuid, primary key)
      - `parent_id` (uuid, foreign key)
      - `onboarding_step` (text)
      - `last_login` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access only their own data
*/

-- Create parents table
CREATE TABLE IF NOT EXISTS parents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  google_id text UNIQUE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- Create children table
CREATE TABLE IF NOT EXISTS children (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid REFERENCES parents(id) ON DELETE CASCADE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  dob date,
  grade text NOT NULL,
  board text NOT NULL,
  subjects jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create preferences table
CREATE TABLE IF NOT EXISTS preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid REFERENCES parents(id) ON DELETE CASCADE NOT NULL UNIQUE,
  language_preference text DEFAULT 'English',
  notifications_on boolean DEFAULT true,
  whatsapp_on boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create activity_log table
CREATE TABLE IF NOT EXISTS activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid REFERENCES parents(id) ON DELETE CASCADE NOT NULL,
  onboarding_step text,
  last_login timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Create policies for parents table
CREATE POLICY "Parents can read own data"
  ON parents
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = google_id OR auth.uid() = id);

CREATE POLICY "Parents can insert own data"
  ON parents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = google_id OR auth.uid() = id);

CREATE POLICY "Parents can update own data"
  ON parents
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = google_id OR auth.uid() = id);

-- Create policies for children table
CREATE POLICY "Parents can read own children"
  ON children
  FOR SELECT
  TO authenticated
  USING (parent_id IN (
    SELECT id FROM parents WHERE auth.uid()::text = google_id OR auth.uid() = id
  ));

CREATE POLICY "Parents can insert own children"
  ON children
  FOR INSERT
  TO authenticated
  WITH CHECK (parent_id IN (
    SELECT id FROM parents WHERE auth.uid()::text = google_id OR auth.uid() = id
  ));

CREATE POLICY "Parents can update own children"
  ON children
  FOR UPDATE
  TO authenticated
  USING (parent_id IN (
    SELECT id FROM parents WHERE auth.uid()::text = google_id OR auth.uid() = id
  ));

CREATE POLICY "Parents can delete own children"
  ON children
  FOR DELETE
  TO authenticated
  USING (parent_id IN (
    SELECT id FROM parents WHERE auth.uid()::text = google_id OR auth.uid() = id
  ));

-- Create policies for preferences table
CREATE POLICY "Parents can read own preferences"
  ON preferences
  FOR SELECT
  TO authenticated
  USING (parent_id IN (
    SELECT id FROM parents WHERE auth.uid()::text = google_id OR auth.uid() = id
  ));

CREATE POLICY "Parents can insert own preferences"
  ON preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (parent_id IN (
    SELECT id FROM parents WHERE auth.uid()::text = google_id OR auth.uid() = id
  ));

CREATE POLICY "Parents can update own preferences"
  ON preferences
  FOR UPDATE
  TO authenticated
  USING (parent_id IN (
    SELECT id FROM parents WHERE auth.uid()::text = google_id OR auth.uid() = id
  ));

-- Create policies for activity_log table
CREATE POLICY "Parents can read own activity"
  ON activity_log
  FOR SELECT
  TO authenticated
  USING (parent_id IN (
    SELECT id FROM parents WHERE auth.uid()::text = google_id OR auth.uid() = id
  ));

CREATE POLICY "Parents can insert own activity"
  ON activity_log
  FOR INSERT
  TO authenticated
  WITH CHECK (parent_id IN (
    SELECT id FROM parents WHERE auth.uid()::text = google_id OR auth.uid() = id
  ));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_parents_google_id ON parents(google_id);
CREATE INDEX IF NOT EXISTS idx_parents_email ON parents(email);
CREATE INDEX IF NOT EXISTS idx_children_parent_id ON children(parent_id);
CREATE INDEX IF NOT EXISTS idx_preferences_parent_id ON preferences(parent_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_parent_id ON activity_log(parent_id);