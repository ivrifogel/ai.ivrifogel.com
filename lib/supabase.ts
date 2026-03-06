import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Browser client (uses anon key, respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server client (uses service role key, bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  short_desc: string | null
  price_cents: number
  type: 'free' | 'paid' | 'bundle' | 'premium'
  category: string | null
  file_path: string | null
  demo_url: string | null
  thumbnail_url: string | null
  features: string[]
  is_published: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type Purchase = {
  id: string
  product_id: string
  email: string
  stripe_session_id: string | null
  stripe_payment_id: string | null
  amount_cents: number | null
  currency: string
  status: 'completed' | 'pending' | 'refunded'
  download_token: string | null
  download_count: number
  created_at: string
}
