import React, { useContext, useEffect, useState } from 'react'
import { API_BASE, LoginGaurd, RefreshToken, getJWT } from '../../../utils/api'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import { UserDataContext } from '../../../App'

const LoadingComponent = () => {
    return (
        <span style={{ width: "50%", minWidth: "150px", borderRadius: "10px", height: "1rem", backgroundColor: "rgba(255,255,255,0.2)", display: "inline-block" }}></span>
    )
}


function Dashboard() {
    const navigate = useNavigate()
    const { profile, setProfile } = useContext(UserDataContext)

    const [fetching, setFetching] = useState(true)

    const [isSubmitting, setSubmitting] = useState(false)

    const [imageUrl, setImageUrl] = useState<string>("");
    const selectedImage = (file: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
        return imageUrl
    }
    useEffect(() => {
        if (profile !== null) return;
        LoginGaurd(navigate)
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
                // setFetching(false)
            }).catch(error => {
                if (error.response?.status === 401) {
                    if (error.response.code === "token_not_valid") { RefreshToken() }
                    // else { delJWT() }
                } else { setFetching(false) }
                console.log(error)
            }).finally(() => {
                setFetching(false)
            })

    }, [])

    const [updateModalShow, setUpdateModalShow] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null)

    const handleUpdate = (e: any) => {
        e.preventDefault()
        if (selectedPhoto === null) { return alert("Select Photo to be updated.") }
        if (selectedPhoto.size > 1024 * 1024 * 3) { return alert("File size should not exceed 3MB.") }
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
                    alert("Profile photo updated successfully")
                    handleModalClose()
                    if (profile) { setProfile({ ...profile, profile_photo: response.data.profile_photo }) }
                }
                else {
                    console.log(response)
                    alert("Some error occured. try again.")
                }
            }).catch(error => {
                if (error.response?.status === 401) {
                    if (error.response.code === "token_not_valid") {
                        RefreshToken();
                        alert("Try again!!")
                    }
                }
                else {
                    alert("Try again!!")
                }
                console.log(error)
            }).finally(() => {
                setSubmitting(false)
                setSelectedPhoto(null)
            })
    }

    const handleModalClose = () => {
        setUpdateModalShow(false)
        setSelectedPhoto(null)
        setImageUrl("")
    }
    const convertFileSize = (size: number) => {
        if (size > 1024000) {
            return (size / (1024 * 1024)).toFixed(2) + " MB"
        } else if (size > 1000) {
            return (size / 1024).toFixed(2) + " KB"
        }
        return size.toString() + " Bytes"
    }
    return (
        <section className='col-11 m-auto pb-5'>
            <div className='d-flex flex-column justify-content-center m-auto'>
                {
                    <>
                        <section className="d-flex flex-md-row flex-column gap-5  align-items-strech justify-content-center mt-5" style={{ alignItems: "stretch" }}>
                            <div className='d-md-flex d-block p-4 mx-0' style={{ border: "1px solid white" }}>
                                <div className='d-flex flex-column m-auto justify-content-center text-center'>
                                    <img src={profile?.profile_photo} style={{ margin: "auto", borderRadius: "50%", border: "1px solid aqua", objectFit: "cover", objectPosition: "center center" }} height="200px" width="200px" alt="Profile Photo" />
                                    {profile && <div><button className='btn mt-3 btn-primary' onClick={() => { setUpdateModalShow(true) }}>Update Profile Photo</button></div>}
                                    <Modal show={updateModalShow} style={{ color: "#fff35f" }}>
                                        <Modal.Header style={{ backgroundColor: "purple", alignItems: "center" }}>
                                            <h2 className='mb-0'>Update Profile Photo</h2>
                                            <button className='btn btn-close btn-close-black' onClick={handleModalClose} aria-label='Close'></button>
                                        </Modal.Header>
                                        <Modal.Body style={{ backgroundColor: "rgb(30, 30, 63)" }}>
                                            <input type='file' accept='image/*' name="profile_photo" aria-label='Profile Photo' onChange={(e: any) => {
                                                setSelectedPhoto(e.target.files[0]);
                                                const reader = new FileReader();
                                                if (e.target.files[0]) { reader.readAsDataURL(e.target.files[0]) }
                                                reader.onload = () => {
                                                    setImageUrl(reader.result as string);
                                                };
                                            }} />
                                            <p>(Max 3 MB size allowed)</p>
                                            {selectedPhoto &&
                                                <div className='mt-3 mb-0'>
                                                    <h4>Preview</h4>
                                                    <div className="d-flex mx-auto p-2 mb-3" style={{ border: "1px solid yellow" }}>
                                                        <img src={imageUrl} className='mx-auto'
                                                            style={{ width: "70%", aspectRatio: "1", border: "1px solid aqua", objectFit: "cover", borderRadius: "50%" }} />
                                                    </div>
                                                    <p><strong>File Size</strong>: {convertFileSize(selectedPhoto.size)}</p>
                                                    <p><strong>File Type</strong>: {selectedPhoto.type}</p>
                                                </div>}
                                        </Modal.Body>
                                        <Modal.Footer style={{ backgroundColor: "purple" }}>
                                            <Button variant='light' onClick={handleModalClose}>Cancel</Button>
                                            <Button variant='primary' onClick={handleUpdate} disabled={selectedPhoto === null || isSubmitting}>{isSubmitting ? "Updating" : "Update"}</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                                <div className='d-flex flex-column text-center text-md-start mx-md-4 pt-md-0 pt-4 my-auto'>
                                    <h5 className=' my-0 pb-2'>{profile?.username || <LoadingComponent />}<hr /></h5>
                                    <h4 className='my-0 pb-2 text-md-nowrap'>{profile?.name || <LoadingComponent />}<hr /></h4>
                                </div>
                                {/* </div> */}
                            </div>
                            <div className='d-block p-4 mx-0' style={{ border: "1px solid white" }}>
                                <h1 className='mx-0 pb-2 mb-5 text-center' style={{ borderBottom: "1px solid white" }}>Personal Details:</h1>
                                <h5 className='my-3'><strong>Email:</strong> {profile?.email || <LoadingComponent />}</h5><hr />
                                <h5 className='my-3'><strong>Mobile:</strong> {profile?.mobile || <LoadingComponent />}</h5><hr />
                                <p><strong>State:</strong> {profile?.state || <LoadingComponent />}</p><hr />
                                {profile?.dob ? <><p><strong>Date of Birth:</strong> {profile.dob}</p><hr /></> : <></>}

                                <p></p>
                            </div>
                        </section>
                    </>
                }
            </div>
        </section>
    )
}

export default Dashboard
