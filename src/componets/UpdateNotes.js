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
    const [inputList, setInputList] = useState([{ id: uuidv4(), noteTitle: '', amount: '', status: false }]);
    const [title, setTitle] = useState("");
    const [total, setTotal] = useState(0)


    useEffect(() => {
        setInputList(state.notes);
        setTitle(state.title);
        // setTotal(sum);
    }, [])
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    // const handleRemoveClick = removeindex => {
    //     setInputList(e => e.filter((arr, index) => index !== removeindex));
    // }
    // const handleInputChange = (e, index) => {
    //     const { name, value } = e.target;
    //     const list = [...inputList];
    //     list[index][name] = value;
    //     setInputList(list);

    //     let notesArray = [];
    //     let data = {
    //         "id": uuidv4(),
    //         "title": title,
    //         "notes": inputList
    //     };
    //     notesArray.push(data);
    //     localStorage.setItem("notes", JSON.stringify(notesArray));
    //     console.log(notesArray)
    // };

    // const navigate = useNavigate();
    // const _addNote = () => {
    //     let notesArray = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
    //     let data = {
    //         "id": uuidv4(),
    //         "title": title,
    //         "notes": inputList
    //     }
    //     notesArray.push(data);
    //     localStorage.setItem("notes", JSON.stringify(notesArray));
    //     console.log(notesArray)

    //     navigate('/');
    // }

    // const titleChange = (e) => {
    //     let notesArray = [];

    //     let data = {
    //         "id": uuidv4(),
    //         "title": title,
    //         "notes": inputList
    //     };
    //     notesArray.push(data);
    //     console.log("notesArray", notesArray);
    //     localStorage.setItem("notes", JSON.stringify(notesArray));
    //     setTitle(e.target.value)
    // }
    // const handleAddClick = () => {  
    //     setInputList([...inputList,{ id: uuidv4() ,  noteTitle: '', amount: '', status: false }])
    // };

    const navigate = useNavigate();
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);

        let notesArray = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
        let data = {
            "id": uuidv4(),
            "title": title,
            "notes": inputList
        }
        notesArray.push(data);
        localStorage.setItem("notes", JSON.stringify(notesArray));
    };

    const titleChange = (e) => {
        let notesArray = [];

        let data = {
            "id": uuidv4(),
            "title": title,
            "notes": inputList
        };
        notesArray.push(data);
        console.log("notesArray", notesArray);
        localStorage.setItem("notes", JSON.stringify(notesArray));
        setTitle(e.target.value)
    }

    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    }


    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { id: uuidv4(), 'noteTitle': '', 'amount': '', 'status': false }])
    };

    const _addNote = () => {


        // let notesArray = localStorage.getItem('notes');
        // let data = {
        //     "id": uuidv4(),
        //     "title": title,
        //     "notes": inputList
        // }
        // notesArray.push(data);
        // localStorage.setItem("notes", JSON.stringify(notesArray));


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
                        <Container onClick={_addNote}>
                            <ArrowBack />
                            <p>Update Notes</p>
                        </Container>
                    </Navbar>
                    <div className='main-content'>

                        <div className='inputField'>
                            <input placeholder='Title' name='title' defaultValue={title} onChange={titleChange} />
                        </div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <p style={{ color: 'black', marginLeft: '15px' }}>Sum : { }</p>
                                {inputList.map((x, i) => {
                                    return (
                                        <div className='head' key={i} style={{ display: 'flex', justifyContent: 'flexSart', marginTop: '10px' }}>
                                            <div className='inputs'>
                                                <input type='checkbox' name='status' defaultValue={x.status} />
                                                <input type='text' name='noteTitle' className='note-input' placeholder='Enter Notes' defaultValue={x.noteTitle} onChange={e => handleInputChange(e, i)} />
                                                <div className='date-time'>
                                                    {date} {time}
                                                </div>
                                            </div>
                                            <div className='amount-icon'>
                                                <input type='text' placeholder='Amount' name='amount' className='amount' defaultValue={x.amount} onChange={e => handleInputChange(e, i)} />
                                                <Close onClick={() => handleRemoveClick(i)} />
                                            </div>
                                        </div>
                                    );

                                })}

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