import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    auth: {
      nextAuthUrl: process.env.NEXTAUTH_URL,
      googleConfigured: !!process.env.GOOGLE_CLIENT_ID
    }
  })
} 