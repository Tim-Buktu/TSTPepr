import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Configurator } from '@/components/configurator'

const instagramPosts = [
  { id: 1, src: "/instagram-1.png", alt: "Instagram post 1" },
  { id: 2, src: "/instagram-2.png", alt: "Instagram post 2" },
  { id: 3, src: "/instagram-3.png", alt: "Instagram post 3" },
  { id: 4, src: "/instagram-4.png", alt: "Instagram post 4" },
  { id: 5, src: "/instagram-5.png", alt: "Instagram post 5" },
  { id: 6, src: "/instagram-6.png", alt: "Instagram post 6" },
];

const projectItems = [
  {
    id: 1,
    src: "/project-dandy.png",
    alt: "Project Dandy",
    title: "Project Dandy",
  },
  {
    id: 2,
    src: "/project-quirky.png",
    alt: "Project Quirky",
    title: "Project Quirky",
  },
  {
    id: 3,
    src: "/project-edge.png",
    alt: "Project Edge",
    title: "Project Edge",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Promo Banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        <p className="italic px-4">
          Rp 40.000 <span className="font-normal">Cashback</span> for first 40
          transactions by inputting code peprisyou in the discount code
        </p>
      </div>

      <Navigation />

      <div className="container mx-auto px-4 pt-20 md:pt-28 pb-12 md:pb-20">
        {/* Add Configurator before other sections */}
        {/* <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Product Configurator
          </h2>
          <p className="text-center text-gray-600 mb-10 md:mb-12 px-4 max-w-2xl mx-auto">
            Customize your product by adjusting the variables
          </p>
          <Configurator />
        </section> */}

        {/* #PEoplePRoject Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            #PEoplePRoject
          </h2>
          <p className="text-center text-gray-600 mb-10 md:mb-12 px-4 max-w-2xl mx-auto">
            Add yours now by using #PeopleProject in your Instagram post
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 justify-items-center max-w-[1200px] mx-auto">
            {instagramPosts.map((post) => (
              <div
                key={post.id}
                className="w-full max-w-[320px] aspect-[320/583]"
              >
                <Image
                  src={post.src}
                  alt={post.alt}
                  width={400}
                  height={729}
                  className="rounded-lg w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </section>

        {/* #PErfectPRoject Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            #PErfectPRoject
          </h2>
          <p className="text-center text-gray-600 mb-10 md:mb-12 px-4 max-w-2xl mx-auto">
            Use our template designs made by well-known designers
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 justify-items-center max-w-[1200px] mx-auto">
            {projectItems.map((item) => (
              <div
                key={item.id}
                className="w-full max-w-[320px] aspect-[320/583]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={400}
                  height={729}
                  className="rounded-lg w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
