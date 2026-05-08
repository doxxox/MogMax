-- MOG ARENA DATABASE SCHEMA

-- 1. Profiles Table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  discord_id TEXT UNIQUE,
  avatar_url TEXT,
  elo INTEGER DEFAULT 1000,
  rank TEXT DEFAULT 'Molecule',
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  peak_elo INTEGER DEFAULT 1000,
  psl_score DECIMAL(3,1) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- 2. Matches Table
CREATE TABLE matches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  player1_id UUID REFERENCES profiles(id),
  player2_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'ongoing', -- 'searching', 'ongoing', 'finished'
  winner_id UUID REFERENCES profiles(id),
  p1_score DECIMAL(3,1),
  p2_score DECIMAL(3,1),
  elo_delta INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Clans Table
CREATE TABLE clans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  tag TEXT UNIQUE NOT NULL,
  owner_id UUID REFERENCES profiles(id),
  total_elo INTEGER DEFAULT 0,
  member_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Clan Members
CREATE TABLE clan_members (
  clan_id UUID REFERENCES clans(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member', -- 'owner', 'admin', 'member'
  PRIMARY KEY (clan_id, user_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Functions
CREATE OR REPLACE FUNCTION update_elo_on_match_end()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'finished' AND NEW.winner_id IS NOT NULL THEN
    -- Logic to update player ELOs based on winner_id
    -- This is a simplified version
    UPDATE profiles SET elo = elo + 20, wins = wins + 1 WHERE id = NEW.winner_id;
    UPDATE profiles SET elo = elo - 15, losses = losses + 1 WHERE id = (CASE WHEN NEW.winner_id = NEW.player1_id THEN NEW.player2_id ELSE NEW.player1_id END);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_match_finished
AFTER UPDATE ON matches
FOR EACH ROW EXECUTE FUNCTION update_elo_on_match_end();
