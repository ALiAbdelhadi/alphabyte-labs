import Image from "next/image"
import Link from "next/link"

import Container from "@/components/Container"

export default function NewCollection() {
  return (
    <div>
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Top Left - Halo Suspended Lamp */}
          <div className="relative">
            <div className="relative mb-4 overflow-hidden">
              <div className="aspect-[4/3] w-full">
                <Image
                  width={500}
                  height={500}
                  quality={100}
                  alt="Line Up/Down LED Suspended Lamp"
                  className="object-cover w-full h-54 md:h-[500px] rounded-lg animate-image"
                  src="/blocks/new-collection/new-collection-3.jpg"
                />
              </div>
              <div className="absolute right-3 top-3 bg-black px-2 py-1">
                <span className="text-xs font-medium text-white">NEW</span>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-medium text-amber-800">
              HALO — LED RING SUSPENDED LAMP
            </h3>
            <Link
              href="#"
              className="text-sm text-gray-700 hover:text-amber-800 hover:underline"
            >
              Discover more
            </Link>
          </div>
          <div className="relative">
            <div className="relative mb-4 overflow-hidden">
              <div className="aspect-[4/3] w-full">
                <Image
                  width={500}
                  height={500}
                  quality={100}
                  alt="Line Up/Down LED Suspended Lamp"
                  className="object-cover w-full h-55 md:h-[500px] rounded-lg animate-image"
                  src="/blocks/new-collection/new-collection-1.jpg"
                />
              </div>
              <div className="absolute right-3 top-3 bg-black px-2 py-1">
                <span className="text-xs font-medium text-white">NEW</span>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-medium text-amber-800">
              LINE — UP/DOWN LED SUSPENDED LAMP
            </h3>
            <Link
              href="#"
              className="text-sm text-gray-700 hover:text-amber-800 hover:underline"
            >
              Discover more
            </Link>
          </div>
          <div className="relative">
            <div className="relative mb-4 overflow-hidden">
              <div className="aspect-[4/3] w-full">
                <Image
                  width={750}
                  height={750}
                  quality={100}
                  alt="Line Up/Down LED Suspended Lamp"
                  className="object-cover w-full h-auto md:h-[500px] lg:h-[750px] rounded-lg animate-image"
                  src="/blocks/new-collection/new-collection-2.jpg"
                />
              </div>
              <div className="absolute right-3 top-3 bg-black px-2 py-1">
                <span className="text-xs font-medium text-white">NEW</span>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-medium text-amber-800">
              HALO — LED RING SUSPENDED LAMP
            </h3>
            <Link
              href="#"
              className="text-sm text-gray-700 hover:text-amber-800 hover:underline"
            >
              Discover more
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
