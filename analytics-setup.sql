-- ============================================
-- Buy Auburn — Analytics Schema
-- Run in Supabase SQL Editor
-- ============================================

CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL,
  referrer TEXT,
  business_id UUID REFERENCES businesses(id),
  device TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log a view" ON page_views FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admin can view analytics" ON page_views FOR SELECT TO authenticated USING (true);

CREATE INDEX idx_page_views_created ON page_views(created_at DESC);
CREATE INDEX idx_page_views_page ON page_views(page);
CREATE INDEX idx_page_views_business ON page_views(business_id);
