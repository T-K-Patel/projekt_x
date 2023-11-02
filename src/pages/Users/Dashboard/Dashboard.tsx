import React, { useEffect, useState } from 'react'
import { API_BASE, LoginGaurd, RefreshToken, getJWT } from '../../../utils/api'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../components/Loading'
import { Button, Card, Modal } from 'react-bootstrap'

interface WorkShop {
    title: string,
    poster: string,
    venue: string,
    club: string,
    hostel: [],
    description: string,
    contact_person: string,
    time: string
}

interface Profile {
    entry: string,
    club: string,
    hostel: string,
    attended_events: WorkShop[],
    name: string,
    email: string,
    mobile: number,
    room: string,
    state: string,
    profile_photo: string,
    isRep: boolean,
    isSecy: boolean,
    points: number
}

function Dashboard() {
    const navigate = useNavigate()
    const [profile, setProfile] = useState<Profile | null>(null)
    const [fetching, setFetching] = useState(true)

    LoginGaurd(navigate)

    const [isSubmitting, setSubmitting] = useState(false)
    useEffect(() => {
        window.scrollTo(0, 0)
        setFetching(true)
        let headersList = {
            "Authorization": "Bearer " + getJWT(),
            "Content-Type": "appication/json"
        }

        let reqOptions = {
            url: `${API_BASE}/users/profile/`,
            method: "GET",
            headers: headersList,
        }
        axios.request(reqOptions)
            .then((response) => {
                if (response?.status === 200) {
                    setProfile(response.data)
                }
                else {
                    console.log(response)
                }
                setFetching(false)
            }).catch(error => {
                if (error.response?.status === 401) {
                    if (error.response.code === "token_not_valid") { RefreshToken() }
                    // else { delJWT() }
                } else { setFetching(false) }
                console.log(error)
            })
    }, [])

    const [updateModalShow, setUpdateModalShow] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState(null)

    const handleUpdate = (e: any) => {
        e.preventDefault()
        if (selectedPhoto === null) { return alert("Select Photo to be updated.") }
        const formdata = new FormData();
        formdata.append("profile_photo", selectedPhoto);
        setSubmitting(true)
        axios.post(`${API_BASE}/users/update_profile_photo/`, formdata, {
            headers: {
                Authorization: `Bearer ${getJWT()}`
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    alert(response.data)
                    window.location.reload()
                }
                else {
                    console.log(response)
                }
                setSelectedPhoto(null)
                setSubmitting(false)
            }).catch(error => {
                if (error.response?.status === 401) {
                    if (error.response.code === "token_not_valid") {
                        RefreshToken();
                        alert("Try again!!")
                    }
                }
                console.log(error)
                setSubmitting(false)
                setSelectedPhoto(null)
            })
    }


    const [workshopModalShow, setWorkshopModalShow] = useState(false)
    const [modalWorkshop, setModalworkshop] = useState<WorkShop | null>(null)
    const handleModalClose = () => {
        setModalworkshop(null)
        setWorkshopModalShow(false)
        setUpdateModalShow(false)
        setSelectedPhoto(null)
    }
    useEffect(() => {
        if (modalWorkshop) {
            const tag = document.getElementById(modalWorkshop.title)
            let text: string = modalWorkshop?.description
            text = text.split("\n").join("<br/>")
            let list = text.split("*")
            let res: string = ""
            let last = false
            list.forEach((phrase: string, idx) => {
                if (phrase === "" && idx !== 1) {
                    res += "*"
                }
                else {
                    if (last) {
                        res += "</b>"
                    }
                    else {
                        res += "<b>"
                    }
                }
            })
            if (tag) {
                tag.innerHTML = text
            }
        }
    })
    return (
        <section className='col-11 m-auto pb-5'>
            <div className='d-flex flex-column justify-content-center m-auto'>
                {profile !== null ?
                    <>
                        <section className="d-flex flex-md-row flex-column gap-5  align-items-strech justify-content-center mt-5" style={{ alignItems: "stretch" }}>
                            <div className='d-md-flex d-block p-4 mx-0' style={{ border: "1px solid white" }}>
                                <div className='d-flex flex-column m-auto justify-content-center text-center'>
                                    <img src={profile.profile_photo} style={{ margin: "auto", borderRadius: "50%", border: "1px solid aqua", objectFit: "cover", objectPosition: "center center" }} height="200px" width="200px" alt="Profile_Photo" />
                                    <div><button className='btn mt-3 btn-primary' onClick={() => { setUpdateModalShow(true) }}>Update Profile Photo</button></div>
                                    <Modal show={updateModalShow} style={{ color: "#fff35f" }}>
                                        <Modal.Header style={{ backgroundColor: "purple", alignItems: "center" }}>
                                            <h2 className='mb-0'>Update Profile Photo</h2>
                                            <button className='btn btn-close btn-close-black' onClick={handleModalClose} aria-label='Close'></button>
                                        </Modal.Header>
                                        <Modal.Body style={{ backgroundColor: "rgb(30, 30, 63)" }}>
                                            <input type='file' accept='image/*' name="profile_photo" aria-label='Profile Photo' onChange={(e: any) => { setSelectedPhoto(e.target.files[0]) }} />
                                        </Modal.Body>
                                        <Modal.Footer style={{ backgroundColor: "purple" }}>
                                            <Button variant='light' onClick={handleModalClose}>Cancel</Button>
                                            <Button variant='primary' onClick={handleUpdate} disabled={selectedPhoto === null || isSubmitting}>Update</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                                <div className='d-flex flex-column text-center text-md-start mx-md-4 pt-md-0 pt-4 my-auto'>
                                    <h4 className='my-0 pb-2 text-md-nowrap'>{profile.name}<hr /></h4>
                                    <h5 className=' my-0 pb-2'>{profile.entry}<hr /></h5>
                                    <h5 className='my-0 pb-2'>Points: {profile.points}<hr /></h5>
                                    {profile.isRep ? <h5 className='my-0'>Representative: <strong>{profile.club}</strong><hr /></h5> : profile.isSecy ? <h5 className='my-0'>Secretory: <strong>{profile.club}</strong><hr /></h5> : <></>}
                                </div>
                                {/* </div> */}
                            </div>
                            <div className='d-block p-4 mx-0' style={{ border: "1px solid white" }}>
                                <h1 className='mx-0 pb-2 mb-5 text-center' style={{ borderBottom: "1px solid white" }}>Personal Details:</h1>
                                <h5 className='my-3'><strong>Email:</strong> {profile.email}</h5><hr />
                                <h5 className='my-3'><strong>Mobile:</strong> {profile.mobile}</h5><hr />
                                <p><strong>State:</strong> {profile.state}</p><hr />
                                <p></p>
                                <p><strong>Hostel:</strong> {profile.hostel}</p><hr />
                                <p><strong>Room:</strong> {profile.room}</p><hr />
                            </div>
                        </section>

                        {profile.attended_events.length !== 0 ?
                            <>
                                <div className='d-block my-5 p-4 mx-0' style={{ border: "1px solid white" }}>
                                    <h1 className='mx-0 pb-2 mb-5 text-center' style={{ borderBottom: "1px solid white" }}>Attended Workshops:</h1>
                                    <div className='d-flex flex-wrap gap-3 justify-content-center'>
                                        {profile.attended_events.map((event: any, _id: number) => {
                                            return (
                                                <Card key={_id}
                                                    style={{ cursor: "pointer", maxWidth: "14rem" }}
                                                    onClick={() => {
                                                        setModalworkshop(event)
                                                        setWorkshopModalShow(true)
                                                    }}>
                                                    {/* <Card.Img style={{ height: "14rem", objectFit: "contain" }} src={`${API_BASE}${event.poster}`} alt='Workshop Poster' /> */}
                                                    <Card.Body className='d-flex' style={{ alignItems: "center" }}>
                                                        {event.title} | {event.club.name}
                                                    </Card.Body>
                                                </Card>
                                            )
                                        })}
                                    </div>
                                </div>
                                <Modal show={workshopModalShow} style={{ color: "#fff35f" }}>
                                    <Modal.Header style={{ backgroundColor: "purple", alignItems: "center" }}>
                                        <h2 className='mb-0'>{modalWorkshop?.title}</h2>
                                        <button className='btn btn-close btn-close-black' onClick={handleModalClose} aria-label='Close'></button>
                                    </Modal.Header>
                                    <Modal.Body style={{ backgroundColor: "rgb(30, 30, 63)" }}>
                                        <img src={modalWorkshop?.poster} width={"100%"} alt="" /><br />
                                        <h5 className='my-3' id={modalWorkshop?.title}></h5><hr />
                                        <h6><strong>Club:</strong> {modalWorkshop?.club}</h6>
                                        <h6><strong>Hostels:</strong> {modalWorkshop?.hostel.map((hostel: any, key: number) => { return (<span key={key}>{hostel.name}{key !== modalWorkshop.hostel.length - 1 && ", "}</span>) })}</h6>
                                        <h6><strong>Time:</strong> {modalWorkshop ? modalWorkshop.time : ""}</h6>
                                        <h6><strong>Venue:</strong> {modalWorkshop?.venue}</h6>
                                    </Modal.Body>
                                    <Modal.Footer style={{ backgroundColor: "purple" }}>
                                        <Button variant='light' onClick={handleModalClose}>Close</Button>
                                        {/* <Button variant='primary'>Report</Button> */}
                                    </Modal.Footer>
                                </Modal>
                            </>
                            : <></>
                        }
                    </>
                    :
                    <Loading text={fetching ? "Loading" : "Error getting Profile !!"} />
                }
            </div>

        </section>
    )
}

export default Dashboard
