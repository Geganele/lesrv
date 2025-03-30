
-- Drop existing RLS policies for therapists to recreate them
DROP POLICY IF EXISTS "Therapists are viewable by everyone" ON public.therapists;
DROP POLICY IF EXISTS "Therapists can be edited by admins" ON public.therapists;

-- Therapists can be read by anyone
CREATE POLICY "Therapists are viewable by everyone" 
ON public.therapists
FOR SELECT 
USING (true);

-- Only admins can insert/update/delete
CREATE POLICY "Therapists can be edited by admins"
ON public.therapists
FOR ALL
USING (auth.jwt() ->> 'email' = 'admin@example.com');
