// this for formatting the price in the product overview page for your country currency
export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
    useGrouping: false,
  })
  return formatter.format(price)
}
