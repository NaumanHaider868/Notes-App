import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
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
    const [notesArray,setNotesArray] = useState([]);
    const [title, setTitle] = useState();
    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const param = useParams();
    const navigate = useNavigate();
    const _updateNote = () => {
        navigate('/');
    }

    useEffect(()=>{
        axios.get(`http://foodapis.techenablers.info/api/notes/${param.id}`)
        .then((resp)=>{
            console.log(resp)
        }).catch((error)=>{
            console.log(error)
        })
    },[])


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
                            <input placeholder='Title' onChange={(e)=>setTitle(e.target.value)} />
                        </div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <p style={{ color: 'black', marginLeft: '15px' }}>Sum : </p>
                                {/* {
                                    notesArray.map((x, i) => {
                                        return (
                                            <> */}
                                                <div className="head" style={{ /*display: 'flex',*/ justifyContent: 'flexSart', marginTop: '10px' }}>
                                                    <div className='inputs'>
                                                        <input type='checkbox' />
                                                        <input type='text' className='note-input' placeholder='Enter Notes' defaultValue={name} name='name' onChange={(e) => setName(e.target.value)} />
                                                        <div className='date-time'>
                                                            {date} {time}
                                                        </div>
                                                    </div>
                                                    <div className='amount-icon'>
                                                        <input type='text' placeholder='Amount' className='amount' name='amount' defaultValue={amount} onChange={(e) => setAmount(e.target.value)} />
                                                        <Close />
                                                    </div>
                                                </div>
                                            {/* </>
                                        )
                                    })
                                }
                                 */}


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