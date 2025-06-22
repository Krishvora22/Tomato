import {useState}from 'react';
import Navbar from './components/Navbar/Navbar';
import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Footer from './components/Footer/Footer';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';

const App = () => {
    const [showLogin, setShowLogin] = useState(false)

  return (
    <>
        {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/order' element={<PlaceOrder />} />        
      </Routes>
    </div>
     <Footer/>
    </>
    
  );
};

export default App;