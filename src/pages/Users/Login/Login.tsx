import React, { useEffect, useState } from 'react'
import { API_BASE, GCAPTCHA_SITE_KEY, LogoutGaurd, setJWT, setREF } from '../../../utils/api'
import './Login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'


function Login() {
    const navigate = useNavigate()

    useEffect(() => {
        LogoutGaurd(navigate)
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        document.head.appendChild(script);
        window.scrollTo(0, 0)
    }, []);

    const validateEntry = (entry: string) => {
        const formatPattern = /^\d{4}[A-Z]{2}\d{5}$/;
        return formatPattern.test(entry)
    }

    const [formData, setFormData] = useState({ username: "", password: "" })
    const [isSubmitting, setSubmitting] = useState(false)

    const handleChange = (e: any) => {
        let { name, value } = e.target
        if (name === "entry") {
            value = value.toUpperCase().replace(/[^A-Z0-9]/g, '')
            if (value.length > 11) {
                value = value.substring(0, 11)
            }
        }
        setFormData({ ...formData, [name]: value.replace(/\s+$/, '') })
    }


    const handleSubmit = (e: any) => {
        e.preventDefault()
        setSubmitting(true)
        //@ts-ignore
        const captcha = window.grecaptcha.getResponse();
        if (!captcha) {
            alert("Fill reCaptcha to proceed.")
            setSubmitting(false)
            return
        }
        const reqOptions = {
            url: `${API_BASE}/users/login/`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'captcha-response': captcha,
            },
            data: formData,
        }
        const urlParams = new URLSearchParams(window.location.search);
        const next = urlParams.get('next');

        axios.request(reqOptions)
            .then(response => {
                if (response.status === 200) {
                    setJWT(response.data.access)
                    setREF(response.data.refresh)
                    if (next) {
                        navigate(`/${next}`, { replace: true })
                    } else { navigate("/dashboard", { replace: true }) }
                }
                else {
                    console.log(response)
                    alert(response.data.detail)
                }
                setSubmitting(false)
            }).catch(error => {
                if (error.response?.status === 400) {
                    alert(JSON.stringify(error.response.data?.detail) || error.response.data?.entry || error.response.data?.password || "Some error occured. Let Developer Fix it.")
                }
                else if (error.response?.status === 401) { alert("Invalid Captcha!!") }
                else if (error.response?.status === 404) { alert("User not Found!") }
                else {
                    alert("Some error occured. Let Developer Fix it.")
                }
                console.log(error)
                setSubmitting(false)
            })
    }

    return (
        <div className='d-flex flex-column justify-content-center m-auto align-items-center'>

            <div className="Login-Form  mt-5 mx-auto">
                <form onSubmit={handleSubmit} className=' d-flex flex-column gap-2 justify-content-center col-md-6 col-lg-4 col-11 text-center pt-4 mx-4' style={{ maxWidth: "450px", minWidth: "320px" }}>
                    <div className='d-flex flex-column w-100 pb-1 px-4 mx-auto text-start' style={{ maxWidth: "400px" }}>
                        <h2 className='text-center mt-0 mb-3'>Login</h2>
                        <label htmlFor="entry">Username (Entry):</label>
                        <input type="text" className={validateEntry(formData.username) || formData.username === "" ? "my-3" : "mt-3"} onChange={handleChange}
                            value={formData.username} name='username' placeholder='Username' title='Username' required />
                        {!validateEntry(formData.username) && formData.username !== "" && <span className='mb-3' id='EntryError' style={{ fontSize: "1rem", color: "red" }}></span>}
                        <label htmlFor="password">Password:</label>
                        <input type="password" className='my-3' onChange={handleChange}
                            value={formData.password} name='password' placeholder='Password' title='Password' required />
                        <a href="/forgotpassword" className='text-end '><h6>Forgot Password?</h6></a>
                    </div>

                    {/* reCaptcha */}
                    <div className='g-recaptcha mx-auto my-0' style={{ minHeight: "75px" }} data-sitekey={GCAPTCHA_SITE_KEY} data-theme='dark'></div>

                    <div className='d-flex flex-column w-100 py-2 mx-auto px-4 text-start' style={{ maxWidth: "400px" }}>
                        <button className='btn btn-primary w-50 mx-auto'
                            disabled={formData.username == "" || formData.password == "" || isSubmitting}>
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>
                <hr />

                <div className='d-flex flex-column w-100 pb-5 mx-auto px-4 text-start' style={{ maxWidth: "400px" }}>
                    <p className='text-center fs-6'>Dont have account?</p>
                    <NavLink to={'/register'} replace={true} className='mx-auto w-50'>
                        <button className='btn btn-secondary w-100 mx-auto'>
                            Register Here
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
export default Login

