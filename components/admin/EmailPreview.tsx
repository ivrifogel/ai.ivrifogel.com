'use client'

type EmailPreviewProps = {
  subject: string
  html: string
}

export default function EmailPreview({ subject, html }: EmailPreviewProps) {
  const fullHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /></head>
    <body style="margin: 0; padding: 0; background: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 500px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px; color: #000;">${subject || 'Subject line'}</h1>
        ${html || '<p style="color: #999;">Start typing to see a preview...</p>'}
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="color: #999; font-size: 11px;">
          You received this because you downloaded a tool from ai.ivrifogel.com.<br/>
          <a href="#" style="color: #999;">Unsubscribe</a>
        </p>
      </div>
    </body>
    </html>
  `

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
      <div className="border-b border-gray-200 bg-white px-4 py-2">
        <div className="text-[10px] text-gray-400">PREVIEW</div>
      </div>
      <iframe
        srcDoc={fullHtml}
        className="h-[500px] w-full border-0"
        title="Email preview"
      />
    </div>
  )
}
