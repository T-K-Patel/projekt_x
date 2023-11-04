import React, { FormEvent, useEffect, useState } from 'react'
import { API_BASE, LoginGaurd, checkJWT, getHeaders } from '../../../utils/api'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Querry() {
  const [query, setQuery] = useState({ subject: "", message: "" })
  const navigate = useNavigate()

  useEffect(() => {
    LoginGaurd(navigate, "/query")

  }, [])
  const [isSubmitting, setSubmitting] = useState(false)
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setQuery({ ...query, [name]: value })
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const reqOptions = {
      url: `${API_BASE}/users/query/`,
      method: "POST",
      headers: getHeaders(),
      data: query
    }
    axios.request(reqOptions).then(response => {
      if (response.status === 200) {
        alert(response.data.detail)
        setQuery({ subject: "", message: "" })
      }
      setSubmitting(false)
    }).catch(error => {
      if (error.response?.data?.subject) { alert("Subject: " + error.response.data.subject) }
      else if (error.response?.data?.message) {
        alert("Message: " + error.response.data.message)
      } else if (error.response?.data?.non_field_errors) {
        alert("Your Query with this subject is already registered")
      } else {
        alert(error.message)
      }
      console.log(error)
      setSubmitting(false)
    })
  }
  const [querry, setQuerry] = useState([])
  useEffect(() => {
    if (checkJWT()){const reqOptions = {
      url: `${API_BASE}/users/query/`,
      method: "GET",
      headers: getHeaders(),
      data: query
    }
    axios.request(reqOptions).then(response => {
      if (response.status === 200) { setQuerry(response.data) }
      else {
        alert("Error: " + response.status)
      }
    }).catch(error => {
      alert("Error: " + error.response?.status)
      console.log(error);

    })}
  }, [])
  return (
    <div>
      {querry.map((q: any, ind) => { return <div key={ind}><h3>{q.subject}</h3><p>{q.message}</p></div> })}
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column" }} className='col-lg-5 col-md-8 col-10 m-auto mt-5'>
          <h1 className='text-center'>Raise Query</h1>
          <input type="text" value={query.subject} onChange={handleChange} name="subject" className='my-3 p-2 bg- border-1' style={{ outline: "none", backgroundColor: "rgba(0,0,0,0.2)", color: "unset" }} required id="subject" placeholder='Subject' />
          <textarea rows={8} value={query.message} onChange={handleChange} name="message" className='my-3 p-2 bg- border-1' style={{ outline: "none", backgroundColor: "rgba(0,0,0,0.2)", color: "unset" }} required id="message" placeholder='Message' />
          <div className='text-end'><button className='btn btn-primary my-3' disabled={isSubmitting || query.subject === "" || query.message === ""}>Submit</button></div>
        </div>
      </form>
    </div>
  )
}

export default Querry
