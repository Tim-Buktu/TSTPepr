import { Navigation } from '@/components/navigation'
import { UpcycleConfigurator } from '@/components/upcycle-configurator'

export default function UpcyclePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Promo Banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        <p className="italic">
          Rp 40.000 <span className="font-normal">Cashback</span> for first 40 transactions by inputting code peprisyou in the discount code
        </p>
      </div>

      <Navigation />

      <div className="pt-24">
        <UpcycleConfigurator />
      </div>
    </main>
  )
}

