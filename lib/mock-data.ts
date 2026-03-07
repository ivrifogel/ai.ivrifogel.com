import { Product } from './supabase'

export const mockProducts: Product[] = [
  {
    id: '7',
    name: 'AI Meeting Report',
    slug: 'ai-meeting-report',
    description: 'Turn any meeting into a polished, structured report — automatically. This tool uses AI to summarize transcripts, extract action items, and generate a professional PDF report you can share with your team.\n\n## What\'s Inside\n\n- AI-powered meeting summarizer\n- Action item extraction\n- Professional PDF report output\n- Speaker attribution\n- Key decisions and highlights',
    short_desc: 'AI-powered meeting summarizer that generates professional PDF reports.',
    price_cents: 0,
    type: 'free',
    category: 'claude-plugins',
    file_path: 'https://byyqqelacuorqpnxfhmv.supabase.co/storage/v1/object/public/ai.ivrifogel.com/meeting-report.zip',
    demo_url: null,
    thumbnail_url: 'https://byyqqelacuorqpnxfhmv.supabase.co/storage/v1/object/public/ai.ivrifogel.com/meeting-report.png',
    features: ['AI meeting summarization', 'Action item extraction', 'Professional PDF output', 'Speaker attribution', 'Key decisions & highlights'],
    is_published: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]
