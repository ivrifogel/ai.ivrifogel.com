-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_desc TEXT,
  price_cents INTEGER NOT NULL,
  type TEXT CHECK (type IN ('free', 'paid', 'bundle', 'premium')),
  category TEXT,
  file_path TEXT,
  demo_url TEXT,
  thumbnail_url TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Purchases table
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  email TEXT NOT NULL,
  stripe_session_id TEXT,
  stripe_payment_id TEXT,
  amount_cents INTEGER,
  currency TEXT DEFAULT 'usd',
  status TEXT CHECK (status IN ('completed', 'pending', 'refunded')),
  download_token TEXT UNIQUE,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Email subscribers table
CREATE TABLE email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Products: publicly readable when published
CREATE POLICY "Products are publicly readable"
  ON products FOR SELECT
  USING (is_published = true);

-- Purchases: only accessible via service role (no public policy)
CREATE POLICY "Purchases are service role only"
  ON purchases FOR ALL
  USING (false);

-- Email subscribers: only accessible via service role (no public policy)
CREATE POLICY "Email subscribers are service role only"
  ON email_subscribers FOR ALL
  USING (false);

-- Create indexes
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_published ON products(is_published);
CREATE INDEX idx_purchases_token ON purchases(download_token);
CREATE INDEX idx_purchases_email ON purchases(email);
CREATE INDEX idx_email_subscribers_email ON email_subscribers(email);

-- Create storage bucket for product files (run this in Supabase dashboard if needed)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-files', 'product-files', false);
