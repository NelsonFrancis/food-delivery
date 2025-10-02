import Add from "../pages/Add"
import List from "../pages/List"
import Orders from "../pages/Orders"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import {Routes, Route} from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'

function App() {

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
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </>
  )
}

export default App
