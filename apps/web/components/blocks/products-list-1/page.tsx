import Container from '@/components/Container'
import ProductsList from './components/product-list'
const page = () => {
    return (
        <div className="py-10 md:py-16 lg:py-20">
            <Container>
                <ProductsList />
            </Container>
        </div>
    )
}

export default page