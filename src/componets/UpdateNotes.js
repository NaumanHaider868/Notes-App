import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import '../componets/update.css';

import {
    SignalCellularAlt,
    SignalWifi4Bar,
    Battery30,
    ArrowBack,
    Close
}
    from '@mui/icons-material';

import { Navbar, Container } from 'react-bootstrap';

function UpdateNotes() {



    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const navigate = useNavigate();















    const _updateNote = () => {


        navigate('/');
    }



    return (
        <>
            <div className='main'>
                <div className='content'>
                    <div className='row'>
                        <div className='col-md-10'>
                            <p>1:16</p>
                        </div>
                        <div className='col-md-2'>
                            <div className='icon'>
                                <span><SignalCellularAlt /></span>
                                <span><SignalWifi4Bar /></span>
                                <span><Battery30 /></span>
                            </div>
                        </div>
                    </div>
                    <Navbar style={{ padding: '12px 12px 0px 0px', justifyContent: 'flexSart' }}>
                        <Container>
                            <ArrowBack onClick={_updateNote} />
                            <p>Update Notes</p>
                        </Container>
                    </Navbar>
                    <div className='main-content'>

                        <div className='inputField'>
                            <input placeholder='Title' />
                        </div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <p style={{ color: 'black', marginLeft: '15px' }}>Sum : </p>
                                <div className="head" style={{ /*display: 'flex',*/ justifyContent: 'flexSart', marginTop: '10px' }}>
                                    <div className='inputs'>
                                        <input type='checkbox' />
                                        <input type='text' className='note-input' placeholder='Enter Notes' />
                                        <div className='date-time'>
                                            {date} {time}
                                        </div>
                                    </div>
                                    <div className='amount-icon'>
                                        <input type='text' placeholder='Amount' className='amount' />
                                        <Close />
                                    </div>
                                </div>

                                <button type="button" style={{ background: "#F06C24", color: "#fff", fontSize: "12px", borderRadius: '20px', border: 'none', padding: '10px', marginLeft: "210px", marginTop: "10px" }}>
                                </button>



                                <div className='btn-box' style={{ position: 'fixed', height: '49px', bottom: '34px', right: '450px', justifyContent: 'center', textAlign: 'center' }}>
                                    <button className='btn btn-note text-center' style={{ marginTop: '0' }}>Add Note</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateNotes


// 456312270716-amghd2b9hmg6g2inn51hip1pt8gmh486.apps.googleusercontent.com



// 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