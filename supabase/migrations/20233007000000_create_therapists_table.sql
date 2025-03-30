
-- Create therapists table
CREATE TABLE IF NOT EXISTS public.therapists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  logo TEXT,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  rating NUMERIC(3,1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  pricing TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  category TEXT,
  featured BOOLEAN DEFAULT FALSE,
  visit_url TEXT,
  bookmarks INTEGER DEFAULT 0,
  agent_name TEXT,
  agent_title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for therapists table
ALTER TABLE public.therapists ENABLE ROW LEVEL SECURITY;

-- Therapists can be read by anyone
CREATE POLICY "Therapists are viewable by everyone" 
ON public.therapists
FOR SELECT 
USING (true);

-- Only admins can insert/update/delete
CREATE POLICY "Therapists can be edited by admins"
ON public.therapists
FOR ALL
USING (auth.jwt() -> 'email' = 'admin@example.com');

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID REFERENCES public.therapists(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for reviews table
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Reviews can be read by anyone
CREATE POLICY "Reviews are viewable by everyone" 
ON public.reviews
FOR SELECT 
USING (true);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'expired')),
  subscription_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expire_at TIMESTAMP WITH TIME ZONE
);

-- RLS Policies for subscriptions table
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can see their own subscriptions
CREATE POLICY "Users can view their own subscriptions" 
ON public.subscriptions
FOR SELECT 
USING (auth.uid() = user_id);

-- Only authenticated users with active premium subscriptions can insert reviews
CREATE POLICY "Only premium subscribers can insert reviews"
ON public.reviews
FOR INSERT
USING (
  EXISTS (
    SELECT 1 FROM public.subscriptions
    WHERE user_id = auth.uid()
    AND status = 'active'
    AND subscription_type = 'premium'
  )
);

-- Users can only update their own reviews
CREATE POLICY "Users can update their own reviews"
ON public.reviews
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can only delete their own reviews
CREATE POLICY "Users can delete their own reviews"
ON public.reviews
FOR DELETE
USING (auth.uid() = user_id);

-- Trigger to update therapist rating when reviews are added/updated/deleted
CREATE OR REPLACE FUNCTION update_therapist_rating()
RETURNS TRIGGER AS $$
DECLARE
  avg_rating NUMERIC;
  review_count INTEGER;
BEGIN
  -- Calculate the new average rating
  SELECT 
    AVG(rating)::NUMERIC(3,1), 
    COUNT(*)
  INTO 
    avg_rating, 
    review_count
  FROM public.reviews
  WHERE therapist_id = COALESCE(NEW.therapist_id, OLD.therapist_id);
  
  -- Update therapist with the new rating and review count
  UPDATE public.therapists
  SET 
    rating = COALESCE(avg_rating, 0),
    reviews = review_count,
    updated_at = NOW()
  WHERE id = COALESCE(NEW.therapist_id, OLD.therapist_id);
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for review changes
CREATE TRIGGER after_review_insert
AFTER INSERT ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION update_therapist_rating();

CREATE TRIGGER after_review_update
AFTER UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION update_therapist_rating();

CREATE TRIGGER after_review_delete
AFTER DELETE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION update_therapist_rating();
