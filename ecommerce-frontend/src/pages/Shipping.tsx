import { useState, type ChangeEvent } from "react"
import { BiArrowBack } from "react-icons/bi";

const Shipping = () => {

const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: ""
})

const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo(prev=>({...prev, [e.target.name] : e.target.value}))
};

  return (

    <div className="shipping">
      <button><BiArrowBack /></button>
      <form>
        <h1>Shipping Address</h1>
        <input 
            required 
            type="text" 
            name="address" 
            placeholder="address" 
            value={shippingInfo.address} 
            onChange={changeHandler} 
        />
        <input 
            required 
            type="text" 
            name="city" 
            placeholder="city" 
            value={shippingInfo.city} 
            onChange={changeHandler} 
        />
        <input 
            required 
            type="text" 
            name="state" 
            placeholder="state" 
            value={shippingInfo.state} 
            onChange={changeHandler} 
        />
        <select 
            required 
            name="country" 
            value={shippingInfo.country} 
            onChange={changeHandler} 
        >
            <option value="">Choose Country</option>
            <option value="USA">USA</option>
        </select>
        <input 
            required 
            type="number" 
            name="pinCode" 
            placeholder="pin code" 
            value={shippingInfo.state} 
            onChange={changeHandler} 
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  )
}

export default Shipping
