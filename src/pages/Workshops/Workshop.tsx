import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { API_BASE, LoginGaurd, getHeaders } from '../../utils/api'
import axios from 'axios'
import { MyWorkshop } from './type'
import { Container } from 'react-bootstrap'
import Loading from '../../components/Loading'

function Workshop() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [error, setError] = useState("Loading")
    const [workshop, setWorkshop] = useState<MyWorkshop | null>(null)

    useEffect(() => {
        LoginGaurd(navigate,`workshop/${id}`)
    }, [])

    useEffect(() => {
        const reqOpt = {
            url: `${API_BASE}/workshops/workshop_by_id/${id}`,
            method: "GET",
            headers: getHeaders(),
        }
        setError("Loading")
        axios.request(reqOpt)
            .then(response => {
                if (response.status === 200) {
                    setWorkshop(response.data)
                }
                else {
                    console.log(response)
                    setError("Some error occured.")
                }
            })
            .catch(error => {
                console.log(error)
                setError("Some error occured.")
            })
    }, [window.location.pathname])
    useEffect(() => {
        if (workshop) {
            const Modaltag = document.getElementById(workshop.title + "-desc")
            let text: string = workshop.description
            text = text.split("\n").join("<br/>")
            if (Modaltag) {
                Modaltag.innerHTML = text
            }
        }
    }, [workshop])
    return (
        <>
            {workshop ? <Container className='py-2'>
                <div className='m-0 p-0' style={{ backgroundColor: "purple" }}>
                    <h1 className='my-3 py-2 text-center'>{workshop.title}</h1>
                </div>
                <div className='d-flex flex-md-nowrap flex-wrap align-items-center justify-content-evenly mx-auto'>
                    <div className='d-flex flex-column col-md-5 col-11'>
                        <img src={workshop.poster} title={workshop.title} className='mx-auto my-0 w-100' style={{ maxHeight: "350px", objectFit: "contain", objectPosition: "center" }} alt="Workshop Poster" /><br />
                        <hr className='d-md-none' />
                    </div>
                    <div className='col-md-5 col-11'>
                        <p><strong>Club:</strong> {workshop.club}</p>
                        <p><strong>Hostels:</strong> {workshop.hostel.map((hostel: any, key: number) => { return (<span key={key}>{hostel}{key !== workshop.hostel.length - 1 && ", "}</span>) })}</p>
                        <p><strong>Time:</strong> {workshop ? workshop.time : ""}</p>
                        <p><strong>Venue:</strong> {workshop.venue}</p>
                        <p><strong>Contact Person:</strong> {workshop.contact_person}</p>
                        <hr className='d-md-none' />
                    </div>
                </div>
                <hr className='d-none d-md-block' />
                <div className='col-11 mx-auto pb-5'>
                    <h5>Description:</h5>
                    <p className='my-3' style={{ textAlign: "justify" }} id={`${workshop.title}-desc`}></p>
                </div>
            </Container>
                : <Loading text={error} />}
        </>
    )
}

export default Workshop
