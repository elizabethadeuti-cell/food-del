import { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css';
import { StoreContext } from '../../Context/StoreContext';
import { Link } from 'react-router-dom';
import { useAuth } from "../../Context/AuthContext";
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { logout } = useAuth();
  const { cartItems } = useContext(StoreContext);

  const cartCount = Object.values(cartItems).reduce((total, qty) => total + qty, 0);

  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className='logo' />

      <ul className="navbar-menu">
        <Link
          to='/'
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href='#explore-menu'
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href='#app-download'
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href='#footer'
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />

        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="" />
          </Link>
          {cartCount > 0 && <div className="cart-count">{cartCount}</div>}
        </div>
         <ProfileMenu />
        <button onClick={logout}>Log out</button>
        
      </div>
    </div>
  );
};

export default Navbar;