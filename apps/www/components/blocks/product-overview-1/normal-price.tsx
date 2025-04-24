import React from "react";
import { formatPrice } from "./lib/utils";

type ProductPrices = {
    price: number;
    quantity?: number;
};

const NormalPrice: React.FC<ProductPrices> = ({
    price,
    quantity = 1,
}) => {
    // here we are using Math.ceil to round up the price to the nearest integer
    // this is because the price is in EGP and we want to avoid decimal values
    const PriceAfterTimesQuantity = price * quantity;
    let normalPrice = Math.ceil(PriceAfterTimesQuantity);
    // If you want to add more parameters to the price like: shippingPrice, taxPrice, etc. 
    // you can add it like this: 
    // When using the quantity parameter, please ensure that the shipping price is updated accordingly, as shipping costs depend on the quantity of products ordered.
    // const PriceAfterTimesQuantity = normalPrice * quantity + shippingPrice + taxPrice * (normalPrice * quantity);
    const formattedTotalPrice = formatPrice(normalPrice);
    return (
        <div>
            <p>{formattedTotalPrice}</p>
        </div>
    );
};

export default NormalPrice;
