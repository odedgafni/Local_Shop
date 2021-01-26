export const calcTotalCart = (products) => {
  let totalQty = 0;
  products.map(product => 
    totalQty += Number(product.qty)
  )
  let totalPrice = 0;
  products.map(product =>
    totalPrice += product.qty * product.price
  )
  return {totalQty, totalPrice: totalPrice.toFixed(2)}
}

