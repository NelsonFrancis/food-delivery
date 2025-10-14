import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Footer from './components/Footer'
import { useState } from 'react'
import LoginPopup from './components/LoginPopup'
import { ToastContainer, Slide } from 'react-toastify'
import Verify from './pages/Verify'
import Myorders from './pages/Myorders'

function App() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
      />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/order' element={<PlaceOrder />}></Route>
          <Route path='/verify' element={<Verify />}></Route>
          <Route path='/myorders' element={<Myorders />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
