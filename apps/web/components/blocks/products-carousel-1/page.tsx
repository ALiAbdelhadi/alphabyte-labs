import Container from "@/components/Container"

import ProductCarousel from "./components/product-carousel"

const page = () => {
  return (
    <div className="py-10 md:py-16 lg:py-20 flex items-center justify-center">
      <Container>
        <ProductCarousel />
      </Container>
    </div>
  )
}

export default page
