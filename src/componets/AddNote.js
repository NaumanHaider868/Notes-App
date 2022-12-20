import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

import '../componets/update.css';

import { SignalCellularAlt, SignalWifi4Bar, Battery30, ArrowBack, Close, Add }
    from '@mui/icons-material';

import { Navbar, Container } from 'react-bootstrap';


function AddNote() {

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const [inputList, setInputList] = useState([]);
    const [title, setTitle] = useState();
    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const [status, setStatus] = useState(false);
    const [id, setId] = useState()
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    const _addNote = () => {

        let arr = [];

        for (let i = 0; i < inputList.length; i++) {
            arr.push({
                "id": inputList[i].id,
                "post_note_id": inputList[i].postId,
                "name": inputList[i].name,
                "amount": inputList[i].amount,
                "status": inputList[i].status,
            })
        }
        axios.post('http://foodapis.techenablers.info/api/notes', {
            title,
            checklists: arr
        }).then((resp) => {
            console.log(resp.data.data);
            setInputList(resp.data.data)
        })
        navigate('/');
    }
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        // setInputList(list);
        setName(list);
        setAmount(list)
    };

    const handleAddClick = () => {
        setInputList([...inputList, { name: '', amount: '', status: false, id: id }])
    };
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    }
    const AddStauts = (e, id) => {
        axios.post(`http://foodapis.techenablers.info/api/notes/${id}/status`,{
            status:e.target.checked
        })
            .then((resp) => {
                console.log(resp.data.data.checklist.status);
                setStatus(resp.data.data.checklist.status)
            }) 
        console.log(id)

    }

    const totalAdd = () => {
        let sum = inputList.reduce(function (prev, current) {
            return prev + +current.amount
        }, 0);
        setTotal(sum);
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
                                <p style={{ color: 'black', marginLeft: '15px' }}>Sum : {total === 0 ? '' : total}</p>
                                {inputList.map((x, i) => {
                                    {/* {total === 0 ? '' : total} */ }
                                    return (
                                        <>
                                            <div className="head" style={{ /*display: 'flex',*/ justifyContent: 'flexSart', marginTop: '10px' }}>
                                                <div className='inputs'>
                                                    <input type='checkbox' name='status' defaultChecked={x.status} onClick={(e) => AddStauts(e, x.id)} />
                                                    <input type='text' className='note-input' placeholder='Enter Notes' name='name' value={x.name} onChange={(e) => { handleInputChange(e, i) }} />
                                                    <div className='date-time'>
                                                        {date} {time}
                                                    </div>
                                                </div>
                                                <div className='amount-icon'>
                                                    <input type='text' placeholder='Amount' className='amount' name='amount' value={x.amount} onChange={(e) => { handleInputChange(e, i); totalAdd() }} />
                                                    <Close onClick={() => { handleRemoveClick(i); }} />
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}


                                {/* <div className='btn-box' style={{ position: 'fixed', height: '49px', bottom: '34px', right: '450px', justifyContent: 'center', textAlign: 'center' }}>
                                    <button className='btn btn-note text-center' style={{ marginTop: '0' }} onClick={handleAddClick}>Add Note</button>
                                </div> */}
                                <div className='bottom-btn' onClick={handleAddClick}>
                                    <button className='btn btn-bottom'>
                                        <Add />
                                    </button>
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