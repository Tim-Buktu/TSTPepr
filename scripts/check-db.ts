import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function checkDatabase() {
  try {
    console.log('Testing database connection...')
    
    // Test connection
    await prisma.$connect()
    console.log('Database connection successful')

    // Test basic query
    const userCount = await prisma.user.count()
    console.log('User count:', userCount)

    // Get database info
    const dbInfo = await prisma.$queryRaw`SELECT current_database(), current_user, version()`
    console.log('Database info:', dbInfo)

  } catch (error) {
    console.error('Database check failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase() 