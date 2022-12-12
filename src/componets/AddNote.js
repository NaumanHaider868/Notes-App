import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

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
    const [inputList, setInputList] = useState([{ id: uuidv4(), 'noteTitle': '', 'amount': '', 'checked': false }]);
    const [title, setTitle] = useState("");
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const totalAdd = () => {
        let sum = inputList.reduce(function (prev, current) {
            return prev + +current.amount
        }, 0);
        setTotal(sum);
    }

    const totalSub = (x, i) => {
        let obj = inputList.find(o => o.id === x.id);
        setTotal(total - obj.amount);
    }

    // useEffect(()=>{
    //     const storedTodos = (JSON.parse(localStorage.getItem("notes")) || []);
    //     setNotesArray(storedTodos);
    //   },[]);

    //   useEffect(() => {
    //     localStorage.setItem("notes",JSON.stringify(notesArray));  
    //    },[notesArray]);


    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    }

    const handleAddClick = () => {
        setInputList([...inputList, { id: uuidv4(), 'noteTitle': '', 'amount': '', 'checked': false }])
    };


    const handleStatus = (id) => {
        const newVal = inputList.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    checked: !item.checked,
                };
            } else {
                return {
                    ...item,
                };
            }
        });

        console.log(newVal)
        setInputList(newVal);
    }

    const _addNote = () => {
        if (title !== '' || inputList[0].noteTitle !== '' || inputList[0].amount !== '') {
            let notesArray = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
            let data = {
                "id": uuidv4(),
                "title": title,
                "notes": inputList
            }
            notesArray.push(data);
            localStorage.setItem("notes", JSON.stringify(notesArray));
        };
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
                            <ArrowBack onClick={_addNote} />
                            <p>Add Notes</p>
                        </Container>
                    </Navbar>
                    <div className='main-content'>
                        <div className='inputField'>
                            <input placeholder='Title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <p style={{ color: 'black', marginLeft: '15px' }}>Sum : {total === 0 ? '' : total}</p>
                                {
                                            inputList.map((x, i) => {
                                                return (
                                                    <>
                                                        {x.checked === false
                                                            && <div className={`${x.checked ? "head2" : "head"}`} key={i} style={{ /*display: 'flex',*/ justifyContent: 'flexSart', marginTop: '10px' }}>
                                                                <div className='inputs'>
                                                                    <input type='checkbox' name='status' checked={x.checked} onClick={(e) => handleStatus(x.id,x)} />
                                                                    <input type='text' name='noteTitle' className='note-input' placeholder='Enter Notes' value={x.noteTitle} onChange={e => handleInputChange(e, i)} />
                                                                    <div className='date-time'>
                                                                        {date} {time}
                                                                    </div>
                                                                </div>
                                                                <div className='amount-icon'>
                                                                    <input type='text' placeholder='Amount' name='amount' className='amount' value={x.amount} onChange={e => { handleInputChange(e, i); totalAdd() }} />
                                                                    <Close onClick={() => { handleRemoveClick(i); totalSub(x, i) }} />
                                                                </div>
                                                            </div>}
                                                    </>
                                                )
                                            })
                                        }

                                <button type="button" onClick={() => setShow(!show)} style={{ background: "#F06C24", color: "#fff", fontSize: "12px", borderRadius: '20px', border: 'none', padding: '10px', marginLeft: "210px", marginTop: "10px" }}>
                                    {show === true ? 'Hide Archived' : 'Show Archived'}
                                </button>
                                {show &&
                                    <>
                                        {
                                            inputList.map((x, i) => {
                                                return (
                                                    <>
                                                    {/* <p style={{ color: 'black', marginLeft: '15px' }}>Sum : {x.checked ? {total} : ''}</p> */}
                                                        {x.checked === true
                                                            && <div className={`${x.checked ? "head2" : "head"}`} key={i} style={{ /*display: 'flex',*/ justifyContent: 'flexSart', marginTop: '10px' }}>
                                                                <div className='inputs'>
                                                                    <input type='checkbox' name='status' checked={x.checked} onClick={() => handleStatus(x.id)} />
                                                                    <input type='text' name='noteTitle' className='note-input' placeholder='Enter Notes' value={x.noteTitle} onChange={e => handleInputChange(e, i)} />
                                                                    <div className='date-time'>
                                                                        {date} {time}
                                                                    </div>
                                                                </div>
                                                                <div className='amount-icon'>
                                                                    <input type='text' placeholder='Amount' name='amount' className='amount' value={x.amount} onChange={e => { handleInputChange(e, i); totalAdd() }} />
                                                                    <Close onClick={() => { handleRemoveClick(i); totalSub(x, i) }} />
                                                                </div>
                                                            </div>}
                                                    </>
                                                )
                                            })
                                        }
                                    </>}


                                <div className='btn-box' style={{ position: 'fixed', height: '49px', bottom: '34px', right: '450px', justifyContent: 'center', textAlign: 'center' }}>
                                    <button className='btn btn-note text-center' style={{ marginTop: '0' }} onClick={handleAddClick}>Add Note</button>
                                </div>
                            </div>
                            {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNote