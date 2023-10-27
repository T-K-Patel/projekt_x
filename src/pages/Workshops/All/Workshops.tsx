import React, { useEffect, useState, Component } from 'react'
import { API_BASE, LoginGaurd, getHeaders } from '../../../utils/api'
import axios from 'axios'
import { Accordion, Button, Card, CardImg, Col, Container, Modal } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import Loading from '../../../components/Loading'
import { MyWorkshop, WorkshopData } from '../type'
import WorkshopRow from '../components/WorkshopRow'


function Workshops() {
    const [workShop, setWorkShop] = useState<WorkshopData>()
    const [loading, setLoading] = useState(true)
    const [text, setText] = useState("Some Error occured.")
    const WorkshopView = () => {
        setLoading(true)
        axios.get(`${API_BASE}/workshops/view/`, { headers: getHeaders() })
            .then((response) => {
                if (response.status === 200) {
                    setWorkShop(response.data)
                    if (response.data.length === 0) {
                        setText("No upcoming Workshop.")
                    }
                }
                else {
                    console.log(response)
                }
                setLoading(false)
            }).catch(error => {
                console.log(error)
                setText("Some Error occured.")
                setLoading(false)
            })
    }
    const navigate = useNavigate()
    useEffect(() => {
        LoginGaurd(navigate,"workshops")
        window.scrollTo(0,0)
        WorkshopView()
    }, [])

    return (
        <div className='col-11 container-md'>
            {workShop ?
                <>{
                    Object.entries(workShop).map(([club, workshops]) => {
                        return (
                            <WorkshopRow key={club} club={club} workshops={workshops} />
                        )
                    })
                }</>
                : <Loading text={loading ? "Loading" : text} />}
        </div>
    )
}

export default Workshops

