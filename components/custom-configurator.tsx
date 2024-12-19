'use client'

// ... other imports
import { useRouter } from 'next/navigation'
import { navigateToCheckout } from '@/lib/checkout'

export function CustomConfigurator() {
  const router = useRouter()
  // ... other state and code

  const handleBuyNow = () => {
    navigateToCheckout(router, {
      productName: 'Custom Tailored Pants',
      price: calculateTotalPrice(), // Your price calculation function
      quantity: 1,
      imageUrl: '/custom-pants-preview.jpg' // Or your preview image
    })
  }

  return (
    // ... other JSX
    <div className="flex gap-4 mt-8">
      <button
        onClick={handleBuyNow}
        className="flex-1 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
        disabled={!isValid}
      >
        Buy Now - ${calculateTotalPrice()}
      </button>
    </div>
    // ... rest of JSX
  )
} 