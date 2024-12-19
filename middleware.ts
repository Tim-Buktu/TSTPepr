import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token
  },
  pages: {
    signIn: '/login'
  }
})

export const config = {
  matcher: [
    '/profile/:path*',
    '/custom/:path*',
    '/api/orders/:path*'
  ]
} 