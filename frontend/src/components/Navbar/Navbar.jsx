import { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount, isLoggedIn , user, setUser } = useContext(StoreContext);
  const [menu, setMenu] = useState("home");
    const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setShowLogout(false);
  };



  return (
    <div className='navbar'>
      <img src={assets.logo} alt='' className='logo' />
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt='' />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="cart" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!isLoggedIn ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="profile-section">
            <div
              className="profile-circle"
              onClick={() => setShowLogout(!showLogout)}
            >
              {user?.firstName?.charAt(0).toUpperCase() || 'U'}
            </div>
            {showLogout && (
              <div className="logout-dropdown">
                <button >Logout</button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;
