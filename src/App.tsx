import React, { Suspense, createContext, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Routes, Route, useParams, NavLink } from 'react-router-dom'
import Login from './pages/Users/Login/Login'
import Home from './pages/Home/Home'
import AddWorkshop from './pages/Workshops/addWorkshop/AddWorkshopForm'
import LeaderBoard from './pages/LeaderBoard/LeaderBoard'
import NavBar from './components/NavBar/NavBar'
import Querry from './pages/Users/Querry/Querry'
// import Dashboard from './pages/Users/Dashboard/Dashboard'
import Workshops from './pages/Workshops/All/Workshops'
import Workshop from './pages/Workshops/Workshop'
import Footer from './components/Footer/Footer'
import Registration from './pages/Users/Registration/Registration'
import Verification from './pages/Users/Registration/Verificaton'
import ForgotPass from './pages/Users/Password/ForgotPass'
import Team from './pages/Team/Team'
import { inject } from '@vercel/analytics';
import { JsonObjectExpression } from 'typescript'

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
const Dashboard = React.lazy(() => import('./pages/Users/Dashboard/Dashboard'))

interface Profile {
  username: string,
  name: string,
  email: string,
  mobile: number,
  dob: string,
  state: string,
  profile_photo: string
}

interface UserData {
  profile: Profile | null,
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>
}

const UserDataContext = createContext<UserData>({ profile: null, setProfile: (a) => { return a } });

function App() {
  inject() 
  const [profile, setProfile] = useState<Profile | null>(null)

  return (
    <UserDataContext.Provider value={{ profile: profile, setProfile: setProfile }}>
      <BrowserRouter>
        <NavBar />
        <div style={{ minHeight: "50vh" }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/verify' element={<Verification />} />
            <Route path='/forgotpassword' element={<ForgotPass />} />
            <Route path='/dashboard' element={
              <Suspense fallback={<h1>Hello This is fallback component</h1>}><Dashboard /></Suspense>
            } />
            <Route path='/team' element={<Team />} />
            {/* <Route path='/workshops' element={<Workshops />} />
          <Route path='/workshops/add' element={<AddWorkshop />} />
          <Route path='/workshop/:id' element={<Workshop />} />
          <Route path='/workshops/:tag' element={<WRKSP_tag />} />
          <Route path='/leaderboard' element={<LeaderBoard />} /> */}
            <Route path='/query' element={<Querry />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </UserDataContext.Provider>
  )
}

export default App
export { UserDataContext }