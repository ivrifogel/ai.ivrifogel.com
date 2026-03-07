import { Product } from './supabase'

export const mockProducts: Product[] = [
  {
    id: '7',
    name: 'AI Meeting Report',
    slug: 'ai-meeting-report',
    description: 'Stop wasting hours writing meeting notes by hand. This Claude plugin records, transcribes, and summarizes your meetings into professional PDF reports — ready to share in minutes, not hours.\n\n## How It Works\n\n- Upload or paste your meeting transcript (Zoom, Google Meet, Teams, or any recording)\n- AI analyzes the conversation — identifying speakers, key decisions, and next steps\n- Get a polished PDF report with action items, summaries, and speaker attribution\n\n## What You Get\n\n- A ready-to-install Claude plugin (.zip)\n- Works with any meeting format or language\n- Outputs clean, share-ready PDF reports\n- Extracts action items with owner and deadline\n- Highlights key decisions and discussion points',
    short_desc: 'Turn Any Meeting Into a Structured Report — Automatically',
    price_cents: 0,
    type: 'free',
    category: 'claude-plugins',
    file_path: 'https://byyqqelacuorqpnxfhmv.supabase.co/storage/v1/object/public/ai.ivrifogel.com/meeting-report.zip',
    demo_url: null,
    thumbnail_url: 'https://byyqqelacuorqpnxfhmv.supabase.co/storage/v1/object/public/ai.ivrifogel.com/meeting-report.png',
    features: ['No manual note-taking — AI captures everything so you can focus on the conversation', 'Works with any meeting platform — Zoom, Google Meet, Teams, or in-person recordings', 'Share-ready in minutes — professional PDF reports your team will actually read'],
    is_published: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]
