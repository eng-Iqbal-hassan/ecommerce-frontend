import { Link } from "react-router-dom"
import {FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa"
import { useState } from "react"

const user = {"_id" : "defg", "role": "Admin"}

const Header = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/search"><FaSearch /></Link>
        <Link to="/cart"><FaShoppingBag /></Link>
        {
            user?._id
            ? <>
                <button onClick={()=>setIsOpen(prev => !prev)}><FaUser /></button>
                <dialog open={isOpen}>
                    <div>
                        {user.role === "Admin" && <Link to="/admin/dashboard">Admin</Link>}
                    </div>
                    <Link to="/orders">orders</Link>
                    <button><FaSignOutAlt /></button>
                </dialog>
              </>
            : <Link to="/cart"><FaSignInAlt /></Link>
        }
    </nav>
  )
}

export default Header
