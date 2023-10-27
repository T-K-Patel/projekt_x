import React, { useEffect, useState } from 'react'
import { API_BASE, GCAPTCHA_SITE_KEY, LogoutGaurd, setJWT, setREF } from '../../../utils/api'
import './Login.css'
import { useNavigate } from 'react-router-dom'
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

    const [formData, setFormData] = useState({ entry: "", password: "" })
    const [isSubmitting, setSubmitting] = useState(false)
    // const input = document.querySelector('input[name="name"]');

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

    // input?.addEventListener('invalid', function (event:any) {
    //     if (event.target?.validity.valueMissing) {
    //         event.target.setCustomValidity('Please tell us how we should address you.');
    //     }
    // })

    // input?.addEventListener('change', function (event:any) {
    //     event.target?.setCustomValidity('');
    // })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setSubmitting(true)
        //@ts-ignore
        const captcha = window.grecaptcha.getResponse();
        if (!captcha) {
            alert("invalid Captcha!")
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
                    alert(error.response.data?.detail || error.response.data?.entry || error.response.data?.password)
                }
                if (error.response?.status === 401) { alert("Invalid Captcha!!") }
                if (error.response?.status === 404) { alert("User not Found!") }
                console.log(error)
                setSubmitting(false)
            })
    }

    return (
        <div className='d-flex justify-content-center m-auto align-items-center'>
            <form onSubmit={handleSubmit} className='Login-Form d-flex flex-column gap-2 justify-content-center col-md-6 col-lg-4 col-11 text-center py-4 mt-5 mx-auto' style={{ maxWidth: "450px", minWidth: "320px" }}>
                <div className='d-flex flex-column w-100 py-1 px-4 mx-auto text-start' style={{ maxWidth: "400px" }}>
                    <label htmlFor="entry">Entry Number:</label>
                    <input type="text" className={validateEntry(formData.entry) || formData.entry === "" ? "my-3" : "mt-3"} onChange={handleChange}
                        value={formData.entry} name='entry' placeholder='Entry Number' title='Entry Number' required pattern="\d{4}[A-Z]{2}\d{5}$" />
                    {!validateEntry(formData.entry) && formData.entry !== "" && <span className='mb-3' id='EntryError' style={{ fontSize: "1rem", color: "red" }}></span>}
                    <label htmlFor="password">Password:</label>
                    <input type="password" className='my-3' onChange={handleChange}
                        value={formData.password} name='password' placeholder='Password' title='Password' required />
                </div>

                {/* reCaptcha */}
                <div className='g-recaptcha mx-auto my-0' style={{ minHeight: "75px" }} data-sitekey={GCAPTCHA_SITE_KEY} data-theme='dark'></div>

                <div className='d-flex flex-column w-100 py-2 mx-auto px-4 text-start' style={{ maxWidth: "400px" }}>
                    <button className='btn btn-primary w-50 mx-auto'
                        disabled={!validateEntry(formData.entry) || formData.password == "" || isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </div>
            </form>
        </div>
    )
}
export default Login

