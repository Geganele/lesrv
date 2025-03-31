
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

-- Add a more permissive policy for admin user to ensure they can modify therapists
CREATE POLICY "Therapists can be inserted by admins"
ON public.therapists
FOR INSERT 
WITH CHECK (auth.jwt() ->> 'email' = 'admin@example.com');

CREATE POLICY "Therapists can be updated by admins"
ON public.therapists
FOR UPDATE
USING (auth.jwt() ->> 'email' = 'admin@example.com');

CREATE POLICY "Therapists can be deleted by admins"
ON public.therapists
FOR DELETE
USING (auth.jwt() ->> 'email' = 'admin@example.com');
