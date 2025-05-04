import React from "react"

import { formatPrice } from "../lib/utils"

interface DiscountPriceProps {
  price: number
  discount: number
  quantity?: number
}
const DiscountPrice: React.FC<DiscountPriceProps> = ({
  price,
  discount,
  quantity = 1,
}) => {
  // here we are using Math.ceil to round up the price to the nearest integer
  // this is because the price is in EGP and we want to avoid decimal values
  let priceIncreasing = Math.ceil(price)
  const discountedPrice = Math.ceil(priceIncreasing * (1 - discount))
  // When using the quantity parameter, please ensure that the shipping price is updated accordingly, as shipping costs depend on the quantity of products ordered.
  // const PriceAfterTimesQuantity = discountedPrice * quantity + shippingPrice + taxPrice * (discountedPrice * quantity);
  const formattedPrice = formatPrice(discountedPrice * quantity)
  return (
    <div>
      <p className="text-destructive font-semibold">{formattedPrice}</p>
    </div>
  )
}

export default DiscountPrice
