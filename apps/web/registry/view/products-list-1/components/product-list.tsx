import Image from "next/image"
import Link from "next/link"
import { products } from "@/registry/view/products-list-1/constant"
import { MoveLeft, MoveRight } from "lucide-react"

import Container from "@/components/Container"

import { Sidebar } from "./sidebar"

export default function ProductsList() {
  return (
    <Container>
      <div className="flex items-center justify-between mb-8 max-w-xl  ">
        <div className="space-y-2 ">
          <h1 className="text-3xl font-normal text-neutral-800">Our Product</h1>
          <p className="text-lg font-light text-muted-foreground ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam ut
            sequi vitae beatae? Commodi, omnis. Incidunt dolore.
          </p>
        </div>
      </div>
      <div className="flex h-screen border border-border p-2 rounded-lg">
        <Sidebar />
        <main className="flex-1  lg:p-8 p-4 overflow-y-auto hide-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group rounded-md overflow-hidden transition-all duration-300 hover:opacity-90"
              >
                <div className="aspect-square relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex justify-between items-center mt-3 mb-1 px-3">
                  <p className="lg:text-lg md:text-base sm:text-sm text-neutral-700">
                    {product.name}
                  </p>
                  <p className="lg:text-lg md:text-base sm:text-sm font-medium text-neutral-700">
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 mt-16">
            <button className="py-3 px-8  rounded-md hover:bg-gray-200 transition-colors">
              <MoveLeft size={20} />
            </button>
            <div className="flex space-x-2">
              <span className="w-8 h-2 bg-gray-950 rounded-full cursor-pointer" />
              <span className="w-2 h-2 bg-gray-300 rounded-full cursor-pointer" />
              <span className="w-2 h-2 bg-gray-300 rounded-full cursor-pointer" />
              <span className="w-2 h-2 bg-gray-300 rounded-full cursor-pointer" />
            </div>
            <button className="py-3 px-8 rounded-md hover:bg-gray-200 transition-colors">
              <MoveRight size={20} />
            </button>
          </div>
        </main>
      </div>
    </Container>
  )
}
