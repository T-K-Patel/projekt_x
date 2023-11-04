import React from 'react'
import { NavLink } from 'react-router-dom'
import { checkJWT } from '../../utils/api'

function Home() {
	return (
		<>
			<div className='d-flex flex-column gap-4 my-5 text-center'>
				<h1 style={{fontSize:"2.5rem"}}>Welcome to</h1>
				<h1 style={{fontSize:"4rem"}}>Projekt-X</h1>
			</div>
			{/* <div className='d-flex flex-row gap-4 justify-content-center mt-5'>
				{checkJWT() && <div><NavLink to='/dashboard' className='btn btn-primary'>Dashboard</NavLink></div>}
				<div><NavLink to='/workshops' className='btn btn-primary'>Workshops</NavLink></div>
				<div><NavLink to='/workshops/add' className='btn btn-primary'>Add New Workshop</NavLink></div>
			</div> */}
			<p className='text-center w-100'>(This page is under construction)</p>
		</>
	)
}

export default Home
