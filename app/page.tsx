import { Navigation } from '@/components/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-8 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6">
              Introducing Pe-Pr
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 md:mb-8 px-4">
              Your one stop solution to exclusive custom clothing
            </p>
            <Link
              href="/designs"
              className="inline-block bg-burgundy-600 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg hover:bg-burgundy-700 transition-colors"
            >
              Make your Designs!
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {['Custom Designs', 'Handmade Clothing', 'Premium Fabrics'].map((item, index) => (
              <div key={index} className="text-center p-4">
                <div className="relative w-full aspect-[4/3] mb-4">
                  <Image
                    src={`/custom-${index + 1}.jpg`}
                    alt={item}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{item}</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {index === 0 && "Templates by award winning designer"}
                  {index === 1 && "Proudly crafted by the 4th generation of a family of tailors in Bandung"}
                  {index === 2 && "Made from fabrics used by named brands like Zara, Massimo Dutti"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">OUR CATALOG</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {['Cream Corduroy', 'Green Cargo', 'Red Corduroy'].map((item, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="relative w-full aspect-[3/4] mb-4">
                  <Image
                    src={`/catalog-${index + 1}.jpg`}
                    alt={item}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{item}</h3>
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    Modify Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customizability Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">CUSTOMIZABILITY</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {['Fabric', 'Designs', 'Measurement'].map((item, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={`/custom-${index + 1}.jpg`}
                    alt={item}
                    fill
                    className="rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">{item}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

