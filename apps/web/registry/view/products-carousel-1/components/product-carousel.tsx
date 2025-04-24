import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/library/carousel'
import ProductCard from './product-card'
import { products } from '../constant'

const ProductCarousel = () => {
    return (
        <Carousel className="w-full">
            <CarouselContent>
                {products.map((product, index) => (
                    <CarouselItem
                        key={index}
                        className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                    >
                        <ProductCard
                            product={product}
                            showBadge={true}
                            showShipping={true}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="ml-9 h-10 w-10 bg-slate-50 text-gray-950" />
            <CarouselNext className="mr-9 h-10 w-10 bg-slate-50 text-gray-950" />
        </Carousel>
    )
}

export default ProductCarousel