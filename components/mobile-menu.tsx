'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)

  // Close menu when clicking outside
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={handleOverlayClick}
        />
      )}

      {/* Menu Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-full overflow-y-auto">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold" onClick={() => setIsOpen(false)}>
                Pe-Pr
              </Link>
              <button
                onClick={toggleMenu}
                className="p-2"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-16">
              <div className="flex flex-col items-center space-y-6">
                <Link
                  href="/products"
                  className={cn(
                    "text-xl py-4 w-full text-center border-b border-gray-200",
                    pathname.startsWith('/products') && "font-semibold text-burgundy-600"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="/upcycle"
                  className={cn(
                    "text-xl py-4 w-full text-center border-b border-gray-200",
                    pathname === '/upcycle' && "font-semibold text-burgundy-600"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Upcycle
                </Link>
                <Link
                  href="/"
                  className={cn(
                    "text-xl py-4 w-full text-center border-b border-gray-200",
                    pathname === '/' && "font-semibold text-burgundy-600"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    "text-xl py-4 w-full text-center border-b border-gray-200",
                    pathname === '/contact' && "font-semibold text-burgundy-600"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </nav>

            <div className="mt-8 flex flex-col space-y-4">
              <Link
                href="/custom"
                className="bg-black text-white px-6 py-2 rounded-full text-center"
                onClick={() => setIsOpen(false)}
              >
                Custom Now!
              </Link>
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-900 text-center"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

