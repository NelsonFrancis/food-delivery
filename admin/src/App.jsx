import Add from "../pages/Add"
import List from "../pages/List"
import Orders from "../pages/Orders"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
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
