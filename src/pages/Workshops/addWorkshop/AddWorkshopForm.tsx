import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import './AddWorkshop.css';
import { API_BASE, LoginGaurd, LogoutUser, RefreshToken, checkJWT, getJWT } from '../../../utils/api';
import { NavLink, useNavigate } from 'react-router-dom';
interface Data {
    title: string,
    poster: string,
    venue: string,
    hostel: string,
    description: string,
    contact_person: string,
    time: string
}
interface Workshopdata {
    title: string,
    poster: string,
    venue: string,
    hostel: string[],
    description: string,
    contact_person: string,
    time: string
}

const hostels = ["Aravali", "Girnar", "Jwalamukhi", "Karakoram", "Kumaon", "Nilgiri", "Shivalik", "Satpura", "Udaigiri", "Vindhyachal", "Zanskar", "Dronagiri", "Saptagiri", "Kailash", "Himadri", "Sahyadri", "Nalanda"]

function AddWorkshop() {
    const navigate = useNavigate()
    useEffect(()=>{
        LoginGaurd(navigate,"workshops/add")
    },[])
    const [errors, setErrors] = useState<Data>()
    const [form_Data, setData] = useState<Workshopdata>({
        title: "",
        poster: "",
        venue: "",
        hostel: [],
        description: "",
        contact_person: "",
        time: ""
    })
    const handleCheck = (e: any) => {
        const options = form_Data.hostel
        let index
        if (e.target.checked) {
            options.push(e.target.value)
        } else {
            index = options.indexOf(e.target.value)
            options.splice(index, 1)
        }
        setData({ ...form_Data, hostel: options })
    }
    const handleChange = (e: any) => {
        const { name, value } = e.target
        setData({ ...form_Data, [name]: value })
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (form_Data.hostel.length === 0) {
            alert("Select hostels to proceed")
            return
        }
        let headersList = {
            "Authorization": "Bearer " + getJWT(),
            "Content-Type": "multipart/form-data"
        }
        const data = new FormData()
        data.append("title", form_Data.title)
        data.append("time", form_Data.time)
        data.append("poster", form_Data.poster)
        data.append("description", form_Data.description)
        data.append("venue", form_Data.venue)
        data.append("contact_person", form_Data.contact_person)
        data.append("hostel", JSON.stringify(form_Data.hostel))
        let reqOptions = {
            url: `${API_BASE}/workshops/add/`,
            method: "POST",
            headers: headersList,
            data: data,
        }
        axios.request(reqOptions)
            .then(response => {
                if (response.status === 200) {
                    setData({ title: "", poster: "", venue: "", hostel: [], description: "", contact_person: "", time: "" })
                }
                alert(response.data.detail)
            })
            .catch(error => {
                if (error.response?.status === 400) {
                    setErrors(error.response.data)
                }
                if (error.response) {
                    alert(error.message)
                }
                console.log(error);
            })
    }

    return (
        <div className="AddWorkshop pb-1">
            <h1 className='text-center my-4'>Add Workshop</h1>
            <form onSubmit={handleSubmit}><section className="WorkshopForm col-lg-5 col-md-6 col-sm-8 col-11 mx-auto my-3 gap-2 d-flex flex-column">
                <input type="text" name="title" id="entry" onChange={handleChange} placeholder='title' required /><span className='text-danger'>{errors?.title ? "This field is required" : null}</span>
                <textarea name="description" id="email" rows={10} onChange={handleChange} placeholder='description' required /><span className='text-danger'>{errors?.description ? "This field is required" : null}</span>
                <input type="text" name="venue" id="hostel" onChange={handleChange} placeholder='venue' required /><span className='text-danger'>{errors?.venue ? "This field is required" : null}</span>
                <input type="datetime-local" name='time' id='mobile' onChange={handleChange} placeholder='time' required /><span className='text-danger'>{errors?.time ? "This field is required" : null}</span>
                <input type="file" accept='image/*' aria-label='Poster' title='Poster' name="poster" id="room" onChange={(e: any) => { setData({ ...form_Data, poster: e.target.files[0] }) }} placeholder='poster' required /><span className='text-danger'>{errors?.poster ? "Poster is required" : null}</span>
                <input type="text" name="contact_person" id="state" onChange={handleChange} placeholder='Contact Person' required /><span className='text-danger'>{errors?.contact_person ? "This field is required" : null}</span>
                <span className='d-inline-flex flex-wrap'>{hostels.map((hostel, ind) => {
                    return (
                        <span key={ind} className='d-flex mx-3' onChange={handleCheck}>
                            <input type='checkbox' name={"hostel"} style={{ cursor: "pointer" }} id={hostel} checked={form_Data.hostel.includes(hostel)} value={hostel} />
                            <label htmlFor={hostel} style={{ cursor: "pointer" }} className='ps-3 py-2'>{hostel}</label>
                        </span>
                    )
                })}</span><span className='text-danger'>{errors?.hostel ? "Hostels required" : null}</span>
                <div className="d-flex"><button type='submit' className='my-4 mx-auto btn btn-primary'>Add Workshop</button></div>
            </section></form>
        </div>
    );
}

export default AddWorkshop;
