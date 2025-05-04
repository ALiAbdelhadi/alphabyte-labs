"use client"

import { useState } from "react"
import { ProductColorTemp } from "@/registry/view/product-overview-1/components/product-color-temp-button"
import ProductImages from "@/registry/view/product-overview-1/components/product-image-carousel"
import { ProductConfigurationPanel } from "@/registry/view/product-overview-1/components/product-info"
import { ProductIP } from "@/registry/view/product-overview-1/components/product-ip-buttons"

import Container from "@/components/Container"

interface ProductOverviewProps {
  productName: string
  productCode?: string
  description: string
  price: number
  originalPrice?: number
  discountPercentage?: number
  images: string[]
  initialIp?: ProductIP
  initialColorTemp?: ProductColorTemp
  stockStatus?: "inStock" | "outOfStock" | "checkAvailability"
  stockStatusText?: string
  specifications?: { [key: string]: string }
}

export default function ProductOverviewPage({
  productName = "Product Name",
  productCode = "PRODUCT-CODE",
  description = "Product description goes here. This is a sample product overview page.",
  price = 99.99,
  discountPercentage = 0.1,
  images = [
    "/components/product-card-1.png",
    "/components/product-card-1.png",
    "/components/product-card-1.png",
  ],
  initialIp = "IP44",
  initialColorTemp = "warm",
  stockStatus = "inStock",
  stockStatusText = "In Stock",
  specifications,
}: ProductOverviewProps) {
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedIp, setSelectedIp] = useState<ProductIP>(initialIp)
  const [selectedColorTemp, setSelectedColorTemp] =
    useState<ProductColorTemp>(initialColorTemp)
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false)
  const [isOrdering, setIsOrdering] = useState<boolean>(false)
  const [currentPrice, setCurrentPrice] = useState<number>(price)

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleIpChange = (newIp: ProductIP) => {
    setSelectedIp(newIp)
  }

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    setTimeout(() => {
      console.log("Added to cart:", {
        productName,
        productCode,
        quantity,
        selectedIp,
        selectedColorTemp,
        price: currentPrice,
      })
      setIsAddingToCart(false)
    }, 1000)
  }

  const handleOrderNow = () => {
    setIsOrdering(true)
    setTimeout(() => {
      console.log("Ordered:", {
        productName,
        productCode,
        quantity,
        selectedIp,
        selectedColorTemp,
        price: currentPrice,
      })
      setIsOrdering(false)
    }, 1000)
  }

  return (
    <div className="py-10 md:py-16 lg:py-20 w-full h-full">
      <Container>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
          <div className="w-full md:w-1/2 lg:w-4/12 mx-auto md:mx-0">
            <ProductImages productImages={images} />
          </div>
          <div className="w-full lg:w-7/12">
            <ProductConfigurationPanel
              productName={productName}
              productCode={productCode}
              description={description}
              displayPrice={price}
              discountPercentage={discountPercentage}
              quantity={quantity}
              onIncreaseQuantity={handleIncreaseQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
              canDecreaseQuantity={quantity > 1}
              showIpSelector={true}
              selectedIp={selectedIp}
              onIpChange={handleIpChange}
              isIpSelectorDisabled={false}
              showColorTempSelector={true}
              selectedColorTemp={selectedColorTemp}
              onColorTempChange={(newTemp) => setSelectedColorTemp(newTemp)}
              isColorTempSelectorDisabled={false}
              showLampSelector={false}
              onAddToCart={handleAddToCart}
              isAddToCartLoading={isAddingToCart}
              onOrderNow={handleOrderNow}
              isOrderNowLoading={isOrdering}
              stockStatus={stockStatus}
              stockStatusText={stockStatusText}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}
