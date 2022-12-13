import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

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


function AddNote() {

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const [inputList, setInputList] = useState([]);
    const [title, setTitle] = useState();
    const [name,setName] = useState();
    const [amount,setAmount] = useState();
    const [status,setStatus] = useState(1);
    const [total, setTotal] = useState();

    const navigate = useNavigate();

    const _addNote = (e) => {
        const apiUrl = 'http://foodapis.techenablers.info/api/notes/create-note';
        axios.post(apiUrl,{
            name,
            title,
            amount,
            status
          }).then((resp)=>{
            console.log(resp.data.data);
            setInputList(resp.data.data)
          })
        navigate('/');
    }

    // const totalAdd = () => {
    //     let sum = inputList.reduce(function (prev, current) {
    //         return prev + +current.amount
    //     }, 0);
    //     // setTotal(sum);
    //     console.log(sum)
    // }

    const handleAddClick = () => {
        setInputList([...inputList,{}]) 
    };
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
                            <ArrowBack onClick={_addNote} />
                            <p>Add Notes</p>
                        </Container>
                    </Navbar>
                    <div className='main-content'>
                        <div className='inputField'>
                            <input placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className='row'>
                            <div className='col-md-12'>
                                <p style={{ color: 'black', marginLeft: '15px' }}>Sum : </p>
                                {/* {total === 0 ? '' : total} */}
                                <div className="head" style={{ /*display: 'flex',*/ justifyContent: 'flexSart', marginTop: '10px' }}>
                                    <div className='inputs'>
                                        <input type='checkbox' name='status' />
                                        <input type='text' className='note-input' placeholder='Enter Notes' name='name' onChange={(e)=>setName(e.target.value)} />
                                        <div className='date-time'>
                                            {date} {time}
                                        </div>
                                    </div>
                                    <div className='amount-icon'>
                                        <input type='text' placeholder='Amount' className='amount' name='amount' onChange={(e)=> {setAmount(e.target.value); }} />
                                        <Close />
                                    </div>
                                </div>

                                <button type="button" style={{ background: "#F06C24", color: "#fff", fontSize: "12px", borderRadius: '20px', border: 'none', padding: '10px', marginLeft: "210px", marginTop: "10px" }}>

                                </button>



                                <div className='btn-box' style={{ position: 'fixed', height: '49px', bottom: '34px', right: '450px', justifyContent: 'center', textAlign: 'center' }}>
                                    <button className='btn btn-note text-center' style={{ marginTop: '0' }} onClick={handleAddClick}>Add Note</button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNote