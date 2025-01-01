/*
  # Create players table for NFL favorites

  1. New Tables
    - `players`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `team` (text)
      - `position` (text)
      - `number` (text)
      - `image_url` (text, nullable)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `players` table
    - Add policies for authenticated users to:
      - Read their own players
      - Insert their own players
      - Delete their own players
*/

CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  team text NOT NULL,
  position text NOT NULL,
  number text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own players
CREATE POLICY "Users can read own players"
  ON players
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert their own players
CREATE POLICY "Users can insert own players"
  ON players
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own players
CREATE POLICY "Users can delete own players"
  ON players
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);