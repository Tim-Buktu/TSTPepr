import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`
    
    // Get table counts
    const counts = await Promise.all([
      prisma.user.count(),
      prisma.order.count(),
      prisma.patch.count()
    ]).catch(() => [0, 0, 0]) // Fallback if tables don't exist yet
    
    return NextResponse.json({
      healthy: true,
      timestamp: new Date().toISOString(),
      stats: {
        users: counts[0],
        orders: counts[1],
        patches: counts[2]
      }
    })
  } catch (error) {
    // Fixed error response
    return NextResponse.json({
      healthy: false,
      error: error instanceof Error ? error.message : 'Database connection failed',
      timestamp: new Date().toISOString()
    }, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
} 