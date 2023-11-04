import React, { useEffect, useState } from 'react'
import { API_BASE, GCAPTCHA_SITE_KEY, LogoutGaurd, setJWT, setREF } from '../../../utils/api'
import '../Login/Login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import OtpInput from 'react-otp-input';


function Verification() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("iron_key") || !localStorage.getItem("username")) {
            navigate('/', { replace: true })
        }
    }, []);
    const [isSubmitting, setSubmitting] = useState(false)
    const [otp, setOtp] = useState("")

    const handleOTP = (e: any) => {

        if (/^[0-9]+$/.test(e) || e === "") {
            setOtp(e)
        }
    }


    const handleSubmit = (e: any) => {
        e.preventDefault()
        setSubmitting(true)
        const reqOptions = {
            url: `${API_BASE}/users/verify/`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: { otp: otp, username: localStorage.getItem("username"), token: localStorage.getItem("iron_key") },
        }

        axios.request(reqOptions)
            .then(response => {
                if (response.status === 200) {
                    localStorage.removeItem("username")
                    localStorage.removeItem("iron_key")
                    navigate("/login", { replace: true })
                }
                else {
                    console.log(response)
                    alert(response.data.detail)
                }
                setSubmitting(false)
            }).catch(error => {
                if (error.response?.status === 400) { alert("Invalid Session Otp") }
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

            <div className="Login-Form my-5 py-0 mx-auto">
                <form onSubmit={handleSubmit} className='d-flex flex-column gap-2 justify-content-center col-md-6 col-lg-4 col-11 text-center pt-4 my-5 mt-3 mx-auto' style={{ maxWidth: "450px", minWidth: "320px" }}>
                    <div className='d-flex flex-column w-100 pb-1 px-4 mx-auto text-start' style={{ maxWidth: "400px" }}>
                        <h2 className='text-center mt-0 mb-3'>Enter Otp to verify</h2>
                        <p className='text-center mt-0 mb-3'>Otp has been sent to your email.</p>
                        <div style={{ width: "max-content" }} className='mx-auto'><OtpInput
                            value={otp}
                            onChange={handleOTP}
                            numInputs={6}
                            renderSeparator={<span>&nbsp;</span>}
                            inputStyle="tel"
                            renderInput={(props) => <input {...props} style={{ width: "40px", textAlign: "center" }} placeholder="-" type="text" required pattern="\d*" />}
                        /></div>
                    </div>
                    <div className='d-flex flex-column w-100 py-2 mx-auto px-4 text-start' style={{ maxWidth: "400px" }}>
                        <button className='btn btn-primary w-50 mx-auto'
                            disabled={isSubmitting}>
                            {isSubmitting ? "Verifying..." : "Verify"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Verification

