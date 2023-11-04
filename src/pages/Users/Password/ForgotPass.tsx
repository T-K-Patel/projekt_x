import React, { useEffect, useState } from 'react'
import { API_BASE, GCAPTCHA_SITE_KEY, LogoutGaurd, setJWT, setREF } from '../../../utils/api'
import '../Login/Login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import OtpInput from 'react-otp-input';


function ForgotPass() {
    const navigate = useNavigate()

    useEffect(() => {
        LogoutGaurd(navigate)
    }, []);
    const [isSubmitting, setSubmitting] = useState(false)
    const [username, setUsername] = useState("")

    const handleChange = (e: any) => {
        setUsername(e.target.value.toUpperCase())

    }


    const handleSubmit = (e: any) => {
        e.preventDefault()
        setSubmitting(true)
        const reqOptions = {
            url: `${API_BASE}/users/forgot/send/`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: { username: username },
        }

        axios.request(reqOptions)
            .then(response => {
                if (response.status === 200) {
                    alert("Email has been sent to registered mail. Visit link in mail to reset password.")
                    navigate("/", { replace: true })
                }
                else {
                    console.log(response)
                    alert(response.data.detail || "Some error occured. Let developer fix it.")
                }
                setSubmitting(false)
            }).catch(error => {
                if (error.response?.status === 400 || error.response?.status === 404) { alert(error.response.data.detail) }
                else if (error.response?.status === 404) { alert("User not Found!") }
                else {
                    alert("Some error occured. Let developer fix it.")
                }
                console.log(error)
                setSubmitting(false)
            })
    }

    return (
        <div className='d-flex flex-column justify-content-center m-auto align-items-center'>

            <div className="Login-Form my-5 py-0 mx-auto">
                <form onSubmit={handleSubmit} className='d-flex flex-column gap-2 justify-content-center col-md-6 col-lg-4 col-11 text-center pt-4 my-5 mt-3 mx-auto' style={{ maxWidth: "450px", minWidth: "320px" }}>
                    <div className='d-flex flex-column w-100 pb-1 px-4 mx-auto text-start' style={{ maxWidth: "400px" }}>
                        <h2 className='text-center mt-0 mb-3'>Forgot Password?</h2>
                        <p className='text-center mt-0 mb-3' style={{ fontSize: "1rem" }}>No worries. Let us know your username, We will send link to reset your password..</p>
                        <input type="text" className={"my-2"} onChange={handleChange}
                            value={username} name='username' title='Username' required placeholder='Username' />
                    </div>
                    <div className='d-flex flex-column w-100 py-2 mx-auto px-4 text-start' style={{ maxWidth: "400px" }}>
                        <button className='btn btn-primary w-50 mx-auto'
                            disabled={isSubmitting || username.length < 3}>
                            {isSubmitting ? "Sending mail..." : "Send Mail"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ForgotPass

