import React, { useEffect, useState } from 'react'
import { API_BASE, GCAPTCHA_SITE_KEY, LogoutGaurd, setJWT, setREF } from '../../../utils/api'
import '../Login/Login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'


function Verification() {
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!localStorage.getItem("iron_key")) {
    //         navigate('/', { replace: true })
    //     }
    // }, []);

    const validateEntry = (entry: string) => {
        const formatPattern = /^\d{4}[A-Z]{2}\d{5}$/;
        return formatPattern.test(entry)
    }

    const [formData, setFormData] = useState({ otp: "" })
    const [isSubmitting, setSubmitting] = useState(false)


    const handleSubmit = (e: any) => {
        e.preventDefault()
        setSubmitting(true)
        const reqOptions = {
            url: `${API_BASE}/users/verify/`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: { otp: formData.otp, entry: localStorage.getItem("entry"), token: localStorage.getItem("iron_key") },
        }

        axios.request(reqOptions)
            .then(response => {
                if (response.status === 200) {
                    navigate("/login", { replace: true })
                }
                else {
                    console.log(response)
                    alert(response.data.detail)
                }
                setSubmitting(false)
            }).catch(error => {
                if (error.response?.status === 400) {
                    alert(error.response.data?.detail || "Some error occured. Let Developer Fix it.")
                }
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
                <form onSubmit={handleSubmit} className='d-flex flex-column gap-2 justify-content-center col-md-6 col-lg-4 col-11 text-center pt-4 my-5 mt-3 mx-4' style={{ maxWidth: "450px", minWidth: "320px" }}>
                    <div className='d-flex flex-column w-100 pb-1 px-4 mx-auto text-start' style={{ maxWidth: "400px" }}>
                        <h2 className='text-center mt-0 mb-3'>Enter Otp to verify</h2>
                        <p className='text-center mt-0 mb-3'>Otp has been sent to your email.</p>
                        <input type="password" className='my-3' onChange={(e) => { setFormData({ otp: e.target.value }) }}
                            value={formData.otp} name='otp' placeholder='- - - - - -' title='otp' required />
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

