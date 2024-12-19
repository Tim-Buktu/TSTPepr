import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-[url('/herobg.png')]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent" />
      </div>
      
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-[#8B1D24] mb-4">
          Introducing Pe-Pr
        </h1>
        <p className="text-xl text-neutral-700 mb-8 max-w-xl mx-auto">
          Your one stop solution to exclusive custom clothing
        </p>
        <Button className="bg-[#8B1D24] hover:bg-[#7A1A20] text-white px-8 py-6 rounded-full text-lg">
          Make your Design!
        </Button>
      </div>
    </section>
    
  )
}
