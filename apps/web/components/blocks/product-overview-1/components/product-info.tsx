"use client";

import { Button } from "@/components/library/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Minus, Plus, ShoppingCart } from "lucide-react";
import DiscountPrice from "./discounted-price";
import NormalPrice from "./normal-price";
import { ColorTemperatureSelector, ProductColorTemp } from "./product-color-temp-button";
import { ProductIP, ProductIPSelector } from "./product-ip-buttons";
import { useState, useEffect } from "react";

interface ProductConfigurationPanelProps {
    productName: string;
    productCode?: string;
    description: string;
    displayPrice: number;
    discountPercentage?: number;
    quantity: number;
    onIncreaseQuantity: () => void;
    onDecreaseQuantity: () => void;
    canDecreaseQuantity: boolean;
    showIpSelector: boolean;
    selectedIp: ProductIP;
    onIpChange: (newIp: ProductIP) => void;
    isIpSelectorDisabled?: boolean;
    showColorTempSelector?: boolean;
    selectedColorTemp: ProductColorTemp;
    onColorTempChange: (newColorTemp: ProductColorTemp) => void;
    isColorTempSelectorDisabled?: boolean;
    showLampSelector: boolean;
    isLampSelectorDisabled?: boolean;
    basePriceForLamp?: number;
    hNumberForLamp?: number;
    onAddToCart: () => void;
    isAddToCartLoading: boolean;
    addToCartLabel?: string;
    onOrderNow: () => void;
    isOrderNowLoading: boolean;
    orderNowLabel?: string;
    stockStatus: "inStock" | "outOfStock" | "checkAvailability";
    stockStatusText?: string;
    availabilityCheckCta?: string
}

export function ProductConfigurationPanel({
    productName,
    productCode = "PRODUCT-CODE",
    description,
    displayPrice,
    discountPercentage,
    quantity,
    onIncreaseQuantity,
    onDecreaseQuantity,
    canDecreaseQuantity,
    showIpSelector,
    selectedIp,
    onIpChange,
    isIpSelectorDisabled,
    showColorTempSelector = true,
    selectedColorTemp,
    onColorTempChange,
    isColorTempSelectorDisabled,
    onAddToCart,
    isAddToCartLoading,
    addToCartLabel = "Add to Cart",
    onOrderNow,
    isOrderNowLoading,
    orderNowLabel = "Order Now",
    stockStatus,
    stockStatusText = "In Stock",
    availabilityCheckCta = "Check Stores Availability",
}: ProductConfigurationPanelProps) {
    // State to track IP-related price changes
    const [currentPrice, setCurrentPrice] = useState(displayPrice);
    const [additionalIpCost, setAdditionalIpCost] = useState(0);

    // Update price when displayPrice or additionalIpCost changes
    useEffect(() => {
        setCurrentPrice(displayPrice + additionalIpCost);
    }, [displayPrice, additionalIpCost]);

    // Handle IP change with price updates
    const handleIpChange = (newIp: ProductIP, newAdditionalPrice?: number) => {
        onIpChange(newIp);
        if (newAdditionalPrice !== undefined) {
            setAdditionalIpCost(newAdditionalPrice);
        }
    };

    return (
        <div className="w-full px-2 sm:px-4 lg:ml-0 xl:ml-8 2xl:ml-16">
            <h1 className="text-xl sm:text-2xl md:text-[24px] lg:text-3xl mt-3 lg:mt-5 mb-2 font-bold uppercase">
                {productCode}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg mb-3">
                {description}
            </p>
            <div className="flex flex-col mb-2 sm:mb-4">
                <div className={cn(
                    "grid gap-4 space-x-0 gap-y-4 grid-cols-1 md:grid-cols-2 ",
                )}>
                    {showColorTempSelector && (
                        <ColorTemperatureSelector
                            value={selectedColorTemp}
                            onValueChange={onColorTempChange}
                            disabled={isColorTempSelectorDisabled || isOrderNowLoading || isAddToCartLoading}
                        />
                    )}
                    {showIpSelector && (
                        <ProductIPSelector
                            value={selectedIp}
                            onValueChange={handleIpChange}
                            disabled={isIpSelectorDisabled || isOrderNowLoading || isAddToCartLoading}
                            title="Water Resistance (IP)"
                            basePrice={displayPrice}
                        />
                    )}
                </div>
            </div>
            <div className="my-3 sm:my-4 flex flex-wrap items-center gap-2 sm:gap-3">
                {discountPercentage && discountPercentage > 0 ? (
                    <>
                        <span className="text-base sm:text-lg font-semibold">
                            <DiscountPrice
                                price={currentPrice}
                                discount={discountPercentage}
                                quantity={quantity}
                            />
                        </span>
                        <s className="text-gray-500 italic text-sm sm:text-base">
                            <NormalPrice price={currentPrice} quantity={quantity} />
                        </s>
                        <span className="text-green-500 font-semibold text-sm sm:text-base">
                            {discountPercentage * 100}% OFF
                        </span>
                    </>
                ) : (
                    <span className="text-base sm:text-lg font-semibold">
                        <NormalPrice price={currentPrice} quantity={quantity} />
                    </span>
                )}
            </div>
            <div className="flex flex-row justify-between items-center w-full mb-3 sm:mb-4 gap-2 sm:gap-0">
                <button
                    className="text-primary text-sm sm:text-base md:text-lg flex items-center hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed"
                    disabled={stockStatus !== 'checkAvailability'}
                >
                    {availabilityCheckCta}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
                </button>
                <p className={cn(
                    "text-sm sm:text-base md:text-lg",
                    stockStatus === 'inStock' ? "text-green-400" : "text-red-500"
                )}>
                    {stockStatusText}
                </p>
            </div>
            <div className="mt-4 sm:mt-6">
                <div className="flex flex-row items-center gap-3 sm:gap-4 w-full">
                    <div className="flex items-center justify-center w-auto">
                        <Button
                            size="icon"
                            onClick={onDecreaseQuantity}
                            disabled={!canDecreaseQuantity || isOrderNowLoading || isAddToCartLoading}
                            className="w-10 h-10 sm:w-12 sm:h-12 shadow-md hover:shadow-lg transition-shadow bg-gray-950 hover:bg-black dark:bg-gray-100 dark:hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Minus className="h-4 w-4 sm:w-5 sm:h-5" />
                        </Button>
                        <span className="text-base sm:text-lg mx-3 sm:mx-4 w-0 sm:w-6 md:w-8 text-center">{quantity}</span>
                        <Button
                            size="icon"
                            onClick={onIncreaseQuantity}
                            disabled={isOrderNowLoading || isAddToCartLoading}
                            className="w-10 h-10 sm:w-12 sm:h-12 shadow-md hover:shadow-lg transition-shadow bg-gray-950 hover:bg-black dark:bg-gray-100 dark:hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Plus className="h-4 w-4 sm:w-5 sm:h-5" />
                        </Button>
                    </div>
                    <Button
                        onClick={onAddToCart}
                        disabled={isAddToCartLoading || isOrderNowLoading || stockStatus !== 'inStock'}
                        className="bg-primary text-white px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base w-full rounded uppercase flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isAddToCartLoading ? "Adding..." : addToCartLabel}
                        {!isAddToCartLoading && (
                            <ShoppingCart className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                    </Button>
                </div>
                <div className="mt-3 sm:mt-4">
                    <button
                        onClick={onOrderNow}
                        disabled={isOrderNowLoading || isAddToCartLoading || stockStatus !== 'inStock'}
                        className={cn(
                            "border-gray-950 dark:border-gray-50 transition-colors duration-300 bg-gray-50 dark:bg-transparent border-[1.5px] px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base w-full rounded",
                            "hover:bg-black hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-950 dark:text-gray-100 dark:bg-background",
                            "disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500"
                        )}
                    >
                        {isOrderNowLoading ? "Processing..." : orderNowLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}