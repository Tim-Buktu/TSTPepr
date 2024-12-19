import { Instagram, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-semibold text-[#8B1D24]">
            Pe-Pr
          </div>
          
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-semibold text-neutral-800">CONTACTS</h4>
            <p className="text-neutral-600">Email Us!</p>
            <p className="text-neutral-600">peprfashion@gmail.com</p>
            <p className="text-neutral-600">Call Us!</p>
            <p className="text-neutral-600">+62 812 1878 6829</p>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="text-neutral-600 hover:text-[#8B1D24]">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-neutral-600 hover:text-[#8B1D24]">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

