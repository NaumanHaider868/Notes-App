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
    const { state, sum } = useLocation();
    // console.log(state);
    const [inputList, setInputList] = useState([{ /*id: uuidv4(),*/ 'noteTitle': '', 'amount': '',/*'status': false,*/ 'checked': false }]);
    const [title, setTitle] = useState("");
    const [total, setTotal] = useState(0);
    const [noteId, setNoteId] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        setInputList(state.notes);
        setTitle(state.title);
        setNoteId(state.id);
        let sum = state.notes.reduce(function (prev, current) {
            return prev + +current.amount
        }, 0);
        setTotal(sum);
    }, [])
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const navigate = useNavigate();
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const titleChange = (e) => {
        setTitle(e.target.value)
    }


    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    }


    const handleAddClick = () => {
        setInputList([...inputList, { id: uuidv4(), 'noteTitle': '', 'amount': '', /*'status': false,*/'checked': false }]);
    };

    const handleStatus = (id,x) => {
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

        let obj = inputList.find(o => o.id === x.id);
        setTotal(total - obj.amount);
    }

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

    const _updateNote = (id) => {
        const _notes = JSON.parse(localStorage.getItem("notes"));
        let arr = [];
        for (let i = 0; i < _notes.length; i++) {
            if (_notes[i].id === noteId) {
                arr.push({
                    "id": noteId,
                    "title": title,
                    "notes": inputList
                })
            } else {
                arr.push(_notes[i]);
            }
        }

        localStorage.setItem("notes", JSON.stringify(arr));
        navigate('/');
        console.log(total)
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
                            <input placeholder='Title' name='title' defaultValue={title} onChange={titleChange} />
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
                                                        {x.checked === true
                                                            && <div className={`${x.checked ? "head2" : "head"}`} key={i} style={{ /*display: 'flex',*/ justifyContent: 'flexSart', marginTop: '10px' }}>
                                                                <div className='inputs'>
                                                                    <input type='checkbox' name='status' checked={x.checked} onClick={(e) => handleStatus(x.id)} />
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateNotes


456312270716-amghd2b9hmg6g2inn51hip1pt8gmh486.apps.googleusercontent.com



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