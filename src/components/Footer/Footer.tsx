// import React from 'react'
import './Footer.css'
import linkedinsvg from '../../assets/linkedin.svg'
import insta from '../../assets/instagram.svg'
import yt from '../../assets/youtube.svg'
import mail from '../../assets/mail-icon.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { LogoutUser } from '../../utils/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faLinkedin, faFacebook, faGithub,faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'

function Footer() {
    const navigate = useNavigate()
    const defWhite = { "a": "white", "b": "white", "c": "white", "d": "white" }
    const defYellow = { "a": "yellow", "b": "yellow", "c": "yellow", "d": "yellow" }
    const [icon, setIcon] = useState({ "a": "white", "b": "white", "c": "white", "d": "white" })
    return (
        <footer className='Footer mt-5'>
            <div className='Footer_Light py-lg-0 py-5 px-3 d-flex flex-column flex-lg-row me-5'>
                <div className="container py-3 text-center justify-content-center ms-lg-0 col-lg-4 d-flex flex-column">
                    <h1 className='display-3'><b>Projekt-X</b></h1>
                    <p>The ultimate idea :)</p>
                </div>
                {/* <div className="col-md-4 py-3 mx-auto d-flex flex-column justify-content-center">
                    <h1 className='text-center'>Pages</h1>
                    <div className='d-flex justify-content-center'><table className='text-center'>
                        <tr>
                            <td><NavLink to={"/"}>Home</NavLink></td>
                            <td><NavLink to={"/workshops"}>Webpages</NavLink></td>
                        </tr>
                        <tr>
                            <td><NavLink to={"/dashboard"}>Dashboard</NavLink></td>
                            <td><span style={{ cursor: "pointer" }} onClick={() => { LogoutUser(navigate) }}>Logout</span></td>
                        </tr>
                    </table></div>
                </div> */}
                <div className="col-lg-4 py-3 mx-auto me-lg-0  d-flex flex-column justify-content-center">
                    <h2 className='text-center py-2 pb-4'>Social Media</h2>
                    <div className='d-flex gap-5 flex-wrap w-100 justify-content-center '>
                        <a href='https://instagram.com/mr._t.k.patel._iitd' target='_blank'>
                            <FontAwesomeIcon icon={faInstagram} style={{ color: icon.a, height: "25px" }} onMouseEnter={(e) => { setIcon({ ...defWhite, a: "yellow" }) }} onMouseLeave={(e) => { setIcon(defWhite) }} />
                        </a>
                        <a href='https://www.linkedin.com/in/t-k-patel/' target='_blank'>
                            <FontAwesomeIcon icon={faLinkedin} style={{ color: icon.b, height: "25px" }} onMouseEnter={(e) => { setIcon({ ...defWhite, b: "yellow" }) }} onMouseLeave={(e) => { setIcon(defWhite) }} />
                        </a>
                        <a href='https://www.facebook.com/tirth.kapadi' target='_blank'>
                            <FontAwesomeIcon icon={faFacebook} style={{ color: icon.c, height: "25px" }} onMouseEnter={(e) => { setIcon({ ...defWhite, c: "yellow" }) }} onMouseLeave={(e) => { setIcon(defWhite) }} />
                        </a>
                        <a href='https://github.com/T-K-Patel' target='_blank'>
                            <FontAwesomeIcon icon={faGithub} style={{ color: icon.d, height: "25px" }} onMouseEnter={(e) => { setIcon({ ...defWhite, d: "yellow" }) }} onMouseLeave={(e) => { setIcon(defWhite) }} />
                        </a>
                    </div>
                    <div className='d-flex flex-column py-3 align-items-center justify-content-center'>
                        For Queries:
                        <a href='mailto:mr.t.k.patel@gmail.com' style={{color:'inherit',textDecoration:"none"}}>
                        <FontAwesomeIcon icon={faEnvelope} style={{ color: icon.d, height: "18px" }}/> mr.t.k.patel@gmail.com</a>
                    </div>
                </div>
            </div>
            <div className='Footer_Dark container d-flex flex-row gap-4 align-items-center justify-content-start text-start py-3'>
                <span className=''>Projekt-X &copy;2023</span> <a href="/privacy.html" style={{ color: "inherit" }}>Privacy &amp; Terms</a>
            </div>
        </footer>
    )
}

export default Footer
