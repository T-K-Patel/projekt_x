import React from 'react'
import './Loading.css'

function Loading(params: any) {
    return (
        <div className='w-100 position-fixed h-100 d-flex align-items-center justify-content-center'
            style={{ top: 0, left: 0,zIndex:"100000" }}>
            <h1 className={`m-0 text-center ${params.text === "Loading" ? 'LoadingText' : ''}`}>{params.text}</h1>
        </div>
    )
}
Loading.defaultProps = {
    text: "Loading"
}

export default Loading
