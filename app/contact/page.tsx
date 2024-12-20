import Image from 'next/image'
import { Navigation } from '@/components/navigation'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Promo Banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        <p className="italic">
          Rp 40.000 <span className="font-normal">Cashback</span> for first 40 transactions by inputting code peprisyou in the discount code
        </p>
      </div>

      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Contact Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-black text-white rounded-full px-6 py-2 mb-6">
            CONTACT PAGE
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Get in touch with us for<br />more information
          </h1>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Location Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-blue-50 rounded-xl p-6 mb-6 aspect-square flex items-center justify-center">
              <div className="relative w-16 h-16">
                <Image
                  src="/place.png"
                  alt="Location"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Location</h2>
            <div className="space-y-2 text-center text-gray-600">
              <p>Palem indah blok A/8, Jakarta Timur</p>
              <p>Jakarta</p>
              <p>Casa de aminda, Jatinangor.</p>
            </div>
            <button className="w-full bg-black text-white rounded-full py-3 hover:bg-gray-800 transition-colors mt-6">
              View Location
            </button>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-blue-50 rounded-xl p-6 mb-6 aspect-square flex items-center justify-center">
              <div className="relative w-16 h-16">
                <Image
                  src="/email.png"
                  alt="Email"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Email</h2>
            <div className="space-y-2 text-center">
              <p className="text-gray-600">timothyhapsim@gmail.com</p>
              <a 
                href="http://linkedin.com/in/timothyhsimanjuntak" 
                className="text-burgundy-600 hover:underline block"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/timothyhsimanjuntak
              </a>
            </div>
            <button className="w-full bg-black text-white rounded-full py-3 hover:bg-gray-800 transition-colors mt-6">
              Send Email
            </button>
          </div>

          {/* Contact Number Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-blue-50 rounded-xl p-6 mb-6 aspect-square flex items-center justify-center">
              <div className="relative w-16 h-16">
                <Image
                  src="/phone.png"
                  alt="Phone"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Contact number</h2>
            <div className="space-y-2 text-center text-gray-600">
              <p>Timothy H Simanjuntak</p>
              <p>0813 1878 6825</p>
            </div>
            <button className="w-full bg-black text-white rounded-full py-3 hover:bg-gray-800 transition-colors mt-6">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
