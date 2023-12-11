import { useSelector } from "react-redux"
import { RootState } from "../../index"
import { TCart } from "../../models/types"

export default function CheckoutPage() {
  const products:TCart[] = useSelector((state:RootState) => state.cart.cart)
  return (
    <div>Checkout</div>
  )
}
