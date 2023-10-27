import React, { useEffect, useState } from 'react'
import { MyWorkshop } from '../type'
import { Card, CardImg } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function Workshop(params: any) {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const workshop = params.workshop
    const [workshopModalShow, setWorkshopModalShow] = useState(false)
    const handleModalClose = () => {
        setWorkshopModalShow(false)
    }
    useEffect(() => {
        const Modaltag = document.getElementById(workshop.title + "-modal")
        let text: string = workshop.description
        text = text.split("\n").join("<br/>")
        if (Modaltag) {
            Modaltag.innerHTML = text
        }
    }, [workshopModalShow])
    useEffect(() => {
        const tag = document.getElementById(workshop.title)
        let text: string = workshop.description
        text = text.split("\n").join("<br/>")
        if (tag) {
            tag.innerHTML = text
        }
    }, [])
    return (
        <Card key={workshop.id}
            style={{ minWidth: "min-content", width: "14rem", backgroundColor: "purple", color: "unset" }}
            onClick={() => { navigate(`/workshop/${workshop.id}`) }}
        >
            <CardImg
                style={{ width: "14rem", height: "14rem", objectFit: "contain" }}
                src={workshop.poster} alt='Workshop Poster'
            />
            <Card.Body className='d-flex h-100 align-items-center justify-content-center'>
                <Card.Title className='my-auto text-center align-items-center'>
                    {workshop.title}
                </Card.Title>
            </Card.Body>
        </Card>
    )
}

function WorkshopRow(params: any) {
    const club = params.club
    const workshops = params.workshops
    return (
        <div className='py-4'><hr />
            <h1 className='text-center'>{club}</h1><hr />
            <section className='d-flex flex-scroll gap-4 py-3'
                style={{
                    justifyContent: "start",
                    alignItems: "stretch",
                    flexDirection: "row",
                    overflowX: "scroll"
                }}>
                {workshops.map((workshop: MyWorkshop, ind: number) => {
                    return (
                        <Workshop key={ind} workshop={workshop} />
                    )
                })

                }
            </section>
        </div>
    )
}

export default WorkshopRow
