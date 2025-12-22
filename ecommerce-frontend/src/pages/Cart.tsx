import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItems from "../components/CartItem";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId: "jgfgugigufc",
    photo: "https://m.media-amazon.com/images/I/51ellgSYmxL._AC_SX425_.jpg",
    name: "Macbook",
    price: 3000,
    quantity: 4,
    stock: 10
  }
];

const subTotal = 4000;
const tax = Math.round(subTotal * 0.18);
const shippingCharges = 200;
const discount = 400;
const total = subTotal + tax + shippingCharges;

const Cart = () => {

  const [coupenCode, setCoupenCode] = useState<string>("");
  const [isValidcoupenCode, setIsValidCoupenCode] = useState<boolean>(false)

  useEffect(()=>{
    const timeoutId = setTimeout(()=>{
      if(Math.random() > 0.5) setIsValidCoupenCode(true);
      else setIsValidCoupenCode(false);
    },1000)
    return () => {
      clearTimeout(timeoutId);
      setIsValidCoupenCode(false);
    }
  },[coupenCode])
  // Debouncing is implemented over there, waited for the user to stop changing, then after 1sec, gien logic will be implemented.

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? cartItems.map((i,index)=>(
          <CartItems key={index} cartItem={i} /> 
        )) : <h1>No Items Added</h1>}
      </main>
      <aside>
        <p>Subtotal: ${subTotal}</p>
        <p>Shipping Charges: ${shippingCharges}</p>
        <p>Tax: ${tax}</p>
        <p>Discount: <em className="red"> - ${discount}</em></p>
        <p><b>Total: {total}</b></p>
        <input 
          type="text"
          placeholder="Coupen code"
          value={coupenCode}
          onChange={(e)=>setCoupenCode(e.target.value)} />
        {
          coupenCode && (
            isValidcoupenCode 
          ? <span className="green">${discount} off using the <code>{coupenCode}</code></span>
          : <span className="red">invalid coupon <VscError /> </span>
          )
        }
        {
          cartItems.length > 0 && <Link to="/shipping">Checkout</Link>
        }
      </aside>
    </div>
  )
}

export default Cart

