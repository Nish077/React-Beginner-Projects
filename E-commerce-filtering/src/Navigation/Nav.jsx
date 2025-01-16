import "./Nav.css";
import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
const Nav = ({query, handleInputChange}) => {
  return (
    <nav>
      <div className="nav-container">
        <input type="text" onChange={handleInputChange}
        value={query}
        placeholder="Enter your search shoes" />
      </div>

      <div className="profice-container">
        <a href="#">
          <FiHeart className="nav-icons"/>
        </a>
        <a href="#">
          <AiOutlineShoppingCart className="nav-icons"/>
        </a>
        <a href="#">
          <AiOutlineUserAdd className="nav-icons"/>
        </a>
      </div>
    </nav>
  )
}

export default Nav