import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
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


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/workshops' element={<Workshops />} />
        <Route path='/workshops/add' element={<AddWorkshop />} />
        <Route path='/workshop/:id' element={<Workshop />} />
        <Route path='/workshops/:tag' element={<WRKSP_tag />} />
        <Route path='/leaderboard' element={<LeaderBoard />} />
        <Route path='/query' element={<Querry />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
