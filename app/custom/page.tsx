import { Navigation } from '@/components/navigation'
import { PantsConfigurator } from '@/components/pants-configurator'

export default function CustomPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-4xl font-bold text-center mb-12">Customize Your Pants</h1>
        <PantsConfigurator />
      </div>
    </main>
  )
}

