// import React from 'react'
import './Footer.css'
import linkedinsvg from '../../assets/linkedin.svg'
import insta from '../../assets/instagram.svg'
import yt from '../../assets/youtube.svg'
import mail from '../../assets/mail-icon.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { LogoutUser } from '../../utils/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faLinkedin, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react'

function Footer() {
    const navigate = useNavigate()
    const [icon, setIcon] = useState({ "a": "white", "b": "white", "c": "white", "d": "white" })
    return (
        <footer className='Footer mt-5'>
            <div className='Footer_Light py-lg-0 py-5 px-3 d-flex flex-column flex-lg-row me-5'>
                <div className="container py-3 text-center justify-content-center d-flex flex-column">
                    <h1 className='display-3'><b>Projekt-X</b></h1>
                    <p>The ultimate idea :)</p>
                </div>
                <div className="col-md-4 py-3 mx-auto d-flex flex-column justify-content-center">
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
                </div>
                <div className="col-md-4 py-3 mx-auto d-flex flex-column justify-content-center">
                    <h1 className='text-center'>Social</h1>
                    <div className='d-flex gap-5 flex-wrap w-100 justify-content-center'>
                        <a href='https://instagram.com/mr._t.k.patel._iitd' target='_blank'>
                            <FontAwesomeIcon icon={faInstagram} style={{ color: icon.a, height: "25px" }} onMouseEnter={(e) => { setIcon({ ...icon, a: "yellow" }) }} onMouseLeave={(e)=>{setIcon({...icon,a:"white"})}} />
                        </a>
                        <a href='https://www.linkedin.com/in/t-k-patel/' target='_blank'>
                            <FontAwesomeIcon icon={faLinkedin} style={{ color: icon.b, height: "25px" }} onMouseEnter={(e) => { setIcon({ ...icon, b: "yellow" }) }} onMouseLeave={(e)=>{setIcon({...icon,b:"white"})}} />
                        </a>
                        <a href='https://www.facebook.com/tirth.kapadi' target='_blank'>
                            <FontAwesomeIcon icon={faFacebook} style={{ color: icon.c, height: "25px" }} onMouseEnter={(e) => { setIcon({ ...icon, c: "yellow" }) }} onMouseLeave={(e)=>{setIcon({...icon,c:"white"})}} />
                        </a>
                        <a href='https://github.com/T-K-Patel' target='_blank'>
                            <FontAwesomeIcon icon={faGithub} style={{ color: icon.d, height: "25px" }} onMouseEnter={(e) => { setIcon({ ...icon, d: "yellow" }) }} onMouseLeave={(e)=>{setIcon({...icon,d:"white"})}} />
                        </a>
                    </div>
                    <div className='d-flex flex-column py-3 align-items-center justify-content-center'>
                        For Queries:
                        <a><img src={mail} /*width={"15rem"}*/ width={"20px"} height={"20px"} alt="Mail" /> help@tkpatel.com</a>
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
