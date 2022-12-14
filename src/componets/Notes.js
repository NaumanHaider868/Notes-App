import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import '../componets/notes.css';
import { SignalCellularAlt, SignalWifi4Bar, Battery30, MoreVert, Search, Add } from '@mui/icons-material';
import { Navbar, Container } from 'react-bootstrap';


function Notes() {
    const navigate = useNavigate();
    const [notesArray, setNotesArray] = useState([]);
    const editItem = (id) => {
        navigate('/updateNotes/' + id);
        console.log(id)
    }

    useEffect(() => {
        axios.get('http://foodapis.techenablers.info/api/notes')
            .then((resp) => {
                console.log('All Notes', resp.data.data.notes);
                setNotesArray(resp.data.data.notes);
            })
    }, []);


    const deleteItem = (index, id) => {
        axios.delete(`http://foodapis.techenablers.info/api/notes/delete-note/${id}`)
            .then((resp) => {
                console.log("delete", resp)
                // setNotesArray(resp)
            })
        const newTodos = [...notesArray];
        newTodos.splice(index, 1);
        setNotesArray(newTodos);
    }

    return (
        <div>
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
                    <Navbar style={{ padding: '12px 12px 0px 12px' }}>
                        <Container style={{ justifyContent: 'space-between' }}>
                            <p>Notes</p>
                            <MoreVert />
                        </Container>
                    </Navbar>
                    <div className='main-content'>
                        <div className='inputField'>
                            <input placeholder='Search' /><Search />
                        </div>
                        <div className='row'>
                            {
                                notesArray.map((x, index) => {
                                    return (

                                        <div className='col-md-6 box'>
                                            <div className='head'>
                                                <div className='title-head'>
                                                    <b>{x.title}</b>
                                                </div>
                                                <div class="dropdown title-icon">
                                                    <button class="btn dropdown-toggle title-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <MoreVert />
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item" onClick={() => editItem(x.id)}>Edit</a></li>
                                                        <li><a class="dropdown-item" onClick={() => deleteItem(index, x.id)}>Delete</a></li>
                                                        <li><a class="dropdown-item" href='#'>Share</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='box-content'>

                                                <div className='data' style={{ display: 'flex' }}>
                                                    <input type='checkbox' />
                                                    <p style={{ paddingTop: '0px', marginBottom: '0', paddingLeft: '4px' }}>{x.name}</p>
                                                    <p style={{ paddingTop: '0px', marginBottom: '0', paddingLeft: '14px' }}>{x.amount}</p>
                                                </div>

                                            </div>

                                        </div>

                                    )
                                })
                            }

                            <Link to='addNote'>
                                <div className='bottom-btn'>
                                    <button className='btn btn-bottom'>
                                        <Add />
                                    </button>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notes


