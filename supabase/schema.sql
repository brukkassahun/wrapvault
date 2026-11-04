-- ============================================
-- WrapVault Database Schema
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(140) UNIQUE NOT NULL,
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  series VARCHAR(100),
  category VARCHAR(30) NOT NULL DEFAULT 'pet-color-change',
  finish_type VARCHAR(50),
  color_family VARCHAR(30),
  price_cny INTEGER NOT NULL,
  features TEXT[] DEFAULT '{}',
  description TEXT,
  images TEXT[] DEFAULT '{}',
  thumbnail TEXT,
  status VARCHAR(20) DEFAULT 'available',
  featured BOOLEAN DEFAULT false,
  roll_width VARCHAR(20) DEFAULT '1.52m',
  roll_length VARCHAR(20) DEFAULT '15m',
  thickness VARCHAR(20),
  durability VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_series ON products(series);
CREATE INDEX IF NOT EXISTS idx_products_finish ON products(finish_type);
CREATE INDEX IF NOT EXISTS idx_products_color ON products(color_family);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view products" ON products;
CREATE POLICY "Public can view products" ON products
  FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  name VARCHAR(200) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(200),
  country VARCHAR(100),
  message TEXT,
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can create inquiries" ON inquiries;
CREATE POLICY "Public can create inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);
