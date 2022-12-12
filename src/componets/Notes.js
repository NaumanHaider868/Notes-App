import React, { useEffect, useState, useRef } from 'react'
import _ from 'lodash';
import { Link, useNavigate } from 'react-router-dom'
import '../componets/notes.css';
import { SignalCellularAlt, SignalWifi4Bar, Battery30, MoreVert, Search, Add } from '@mui/icons-material';
import { Navbar, Container } from 'react-bootstrap';


function Notes() {
    const navigate = useNavigate();
    
    const editItem = () => {
        navigate('/updateNotes');
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
                            
                                        <div className='col-md-6 box'>
                                            <div className='head'>
                                                <div className='title-head'>
                                                    <b>title</b>
                                                </div>
                                                <div class="dropdown title-icon">
                                                    <button class="btn dropdown-toggle title-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <MoreVert />
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item" onClick={() => editItem()}>Edit</a></li>
                                                        <li><a class="dropdown-item" /*delItem={note}*/>Delete</a></li>
                                                        <li><a class="dropdown-item" href='#'>Share</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='box-content'>
                                                
                                                            <div className='data' style={{ display: 'flex' }}>
                                                                <input type='checkbox' />
                                                                <p style={{ paddingTop: '0px', marginBottom: '0', paddingLeft: '4px' }}>noteTitle</p>
                                                                <p style={{ paddingTop: '0px', marginBottom: '0', paddingLeft: '14px' }}>amount</p>
                                                            </div>
                                                        
                                            </div>
                                        </div>

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


