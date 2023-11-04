import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Routes, Route, useParams, NavLink } from 'react-router-dom'
import Login from './pages/Users/Login/Login'
import Home from './pages/Home/Home'
import AddWorkshop from './pages/Workshops/addWorkshop/AddWorkshopForm'
import LeaderBoard from './pages/LeaderBoard/LeaderBoard'
import NavBar from './components/NavBar/NavBar'
import Querry from './pages/Users/Querry/Querry'
import Dashboard from './pages/Users/Dashboard/Dashboard'
import Workshops from './pages/Workshops/All/Workshops'
import Workshop from './pages/Workshops/Workshop'
import Footer from './components/Footer/Footer'
import Registration from './pages/Users/Registration/Registration'
import Verification from './pages/Users/Registration/Verificaton'
import ForgotPass from './pages/Users/Password/ForgotPass'

function WRKSP() {
  const { id } = useParams()
  return (
    <div>
      <h1>Id: {id}</h1>
    </div>
  )
}
function WRKSP_tag() {
  const { tag } = useParams()
  return (
    <div>
      <h1>Tag: {tag}</h1>
    </div>
  )
}
function Error404() {
  return (
    <>
      <div className='text-center pt-5'>
        <h1>Error 404</h1>
        <p>Requested Page not found.</p>
        <NavLink to="/" replace={true} className="btn btn-info ">Go to Home</NavLink>
      </div>
    </>)
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div style={{minHeight:"50vh"}}><Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/verify' element={<Verification />} />
        <Route path='/forgotpassword' element={<ForgotPass />} />
        <Route path='/dashboard' element={<Dashboard />} />
        {/* <Route path='/workshops' element={<Workshops />} />
        <Route path='/workshops/add' element={<AddWorkshop />} /> */}
        {/* <Route path='/workshop/:id' element={<Workshop />} />
        <Route path='/workshops/:tag' element={<WRKSP_tag />} /> */}
        {/* <Route path='/leaderboard' element={<LeaderBoard />} /> */}
        <Route path='/query' element={<Querry />} />
        <Route path='*' element={<Error404 />} />
      </Routes></div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
