import React, { useEffect, useState } from 'react'
import { API_BASE, GCAPTCHA_SITE_KEY, LogoutGaurd, setJWT, setREF } from '../../../utils/api'
import '../Login/Login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { json } from 'stream/consumers'


function Registration() {
    const navigate = useNavigate()

    useEffect(() => {
        LogoutGaurd(navigate)
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        document.head.appendChild(script);
        window.scrollTo(0, 0)
    }, []);

    const validateFormData = (formData: any) => {
        return !(
            formData.entry === "" ||
            formData.password === "" ||
            formData.cpassword === "" ||
            formData.name === "" ||
            formData.mobile === "" ||
            formData.email === "" ||
            formData.state === "" ||
            formData.mobile.length !== 10 ||
            formData.cpassword !== formData.password
        )
    }

    const [formData, setFormData] = useState({ entry: "", password: "", cpassword: "", state: "", mobile: "", name: "", email: "" })
    const [isSubmitting, setSubmitting] = useState(false)

    const handleChange = (e: any) => {
        let { name, value } = e.target
        if (name === "entry") {
            value = value.toUpperCase().replace(/[^A-Z0-9]/g, '')
            if (value.length > 11) {
                value = value.substring(0, 11)
            }
        }
        if (name === "mobile") {
            value = value.toUpperCase().replace(/[^0-9]/g, '')
            if (value.length > 10) {
                value = value.substring(0, 10)
            }
        }
        setFormData({ ...formData, [name]: value })
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
        if (!validateFormData(formData)) {
            alert("Invalid data.")
            setSubmitting(false)
            return
        }
        const reqOptions = {
            url: `${API_BASE}/users/register/`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'captcha-response': captcha,
            },
            data: formData,
        }

        axios.request(reqOptions)
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem("entry", response.data.entry)
                    localStorage.setItem("iron_key", response.data.token)
                    navigate("/verify", { replace: true })
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
                        <h2 className='text-center mt-0 mb-3'>Register</h2>
                        <label htmlFor="entry">Username (Entry):</label>
                        <input type="text" className={"my-2"} onChange={handleChange}
                            value={formData.entry} name='entry' placeholder='Username' title='Username' required />

                        <label htmlFor="name">Name:</label>
                        <input type="text" className={"my-2"} onChange={handleChange}
                            value={formData.name} name='name' placeholder='Name' title='Name' required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" className={"my-2"} onChange={handleChange}
                            value={formData.email} name='email' placeholder='Email' title='Email' required />

                        <label htmlFor="mobile">Mobile:</label>
                        <input type="tel" className={"my-2"} onChange={handleChange}
                            value={formData.mobile} name='mobile' placeholder='Mobile' title='Mobile' required />

                        <label htmlFor="entry">State:</label>
                        <input type="text" className={"my-2"} onChange={handleChange}
                            value={formData.state} name='state' placeholder='State' title='State' required />

                        <label htmlFor="password">Password:</label>
                        <input type="password" className={"my-2"} onChange={handleChange}
                            value={formData.password} name='password' placeholder='Password' title='Password' required />

                        <label htmlFor="password">Confirm Password:</label>
                        <input type="password" className={"my-2"} onChange={handleChange}
                            value={formData.cpassword} name='cpassword' placeholder='Confirm Password' title='Confirm Password' required />

                    </div>

                    {/* reCaptcha */}
                    <div className='g-recaptcha mx-auto my-0' style={{ minHeight: "75px" }} data-sitekey={GCAPTCHA_SITE_KEY} data-theme='dark'></div>

                    <div className='d-flex flex-column w-100 py-2 mx-auto px-4 text-start' style={{ maxWidth: "400px" }}>
                        <button className='btn btn-primary w-50 mx-auto'
                            disabled={!validateFormData(formData) || isSubmitting}>
                            {isSubmitting ? "Registering..." : "Register"}
                        </button>
                    </div>
                </form>
                <hr />

                <div className='d-flex flex-column w-100 pb-5 mx-auto px-4 text-start' style={{ maxWidth: "400px" }}>
                    <p className='text-center fs-6'>Already have account?</p>
                    <NavLink to={'/login'} className='mx-auto w-50'>
                        <button className='btn btn-secondary w-100 mx-auto'>
                            Login
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
export default Registration

