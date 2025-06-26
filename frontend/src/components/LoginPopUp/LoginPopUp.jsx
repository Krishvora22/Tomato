import { useContext, useState } from 'react';
import './LoginPopUp.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext.jsx';
import { loginuser, signupUser } from '../../../service/login.api.js';

const LoginPopUp = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { setIsLoggedIn } = useContext(StoreContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (currState === 'Sign Up') {
        data = await signupUser(formData);
        alert("Signup successful");
      } else {
        data = await loginuser(formData);
        alert("Login successful");
      }

      // store token if returned
      if (data.authToken) {
        localStorage.setItem("token", data.authToken);
        setIsLoggedIn(true);
      }

      if (data.user && data.user.id) {
      localStorage.setItem("userId", data.user.id);
    }


      console.log(data);
      setShowLogin(false);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message;
      alert(Array.isArray(msg) ? msg.join(', ') : msg || "Error occurred");
    }
  };

  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={handleSubmit}>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='' />
        </div>
        <div className='login-popup-inputs'>
          {currState === "Login" ? null : (
            <>
              <input name='firstName' value={formData.firstName} onChange={handleChange} placeholder='First name' required />
              <input name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Last name' required />
            </>
          )}
          <input name='email' value={formData.email} onChange={handleChange} placeholder='Email' required />
          <input name='password' value={formData.password} onChange={handleChange} type='password' placeholder='Password' required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use and privacy policy.</p>
        </div>
        <p>
          {currState === "Login" ? "Create a new account?" : "Already have an account?"}
          <span onClick={() => setCurrState(currState === "Login" ? "Sign Up" : "Login")}>
            {currState === "Login" ? " Sign up" : " Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopUp;
