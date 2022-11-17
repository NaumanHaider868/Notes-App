import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../componets/notes.css';
import { SignalCellularAlt, SignalWifi4Bar, Battery30, MoreVert, Search, Add } from '@mui/icons-material';
import { Navbar, Container } from 'react-bootstrap';


function Notes() {
    const navigate = useNavigate();
    const [notesArray, setNotesArray] = useState(JSON.parse(localStorage.getItem('notes')) || []);
    const [search, setSearch] = useState('');
    // const [searchInput, setSearchInput] = useState('');
    // const [filteredResults, setFilteredResults] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('notes')) {
            setNotesArray(JSON.parse(localStorage.getItem('notes')));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notesArray));
    }, [notesArray]);


    const editItem = (note, total) => {
        navigate('/updateNotes', { state: note, sum: total });
    }
    const deleteItem = (index) => {
        const newTodos = [...notesArray];
        newTodos.splice(index, 1);
        // localStorage.removeItem("notes");
        setNotesArray(newTodos);
    }
    const searchValue = useRef();    
    const searchHandler = (e,searchValue) => {
        setSearch(e.target.value)
        if (search !== '') {
            const list = notesArray.filter((i) => {
                return Object.values(i)
                    .join(' ')
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
            setSearch(list)
        }
        
        // console.log(searchValue)
        // // setSearchInput(searchValue)
        // // if (searchInput !== '') {
        // //     const filteredData = notesArray.filter((item) => {
        // //         return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        // //     })
        // //     setFilteredResults(filteredData)
        // // }
        // // else{
        // //     setFilteredResults(notesArray)
        // // }

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
                            <input placeholder='Search' /*ref={searchValue}*/ /*value={search}*/ onChange={(e) => setSearch(e.target.value)} /><Search />
                        </div>
                        <div className='row'>
                            {
                                notesArray.map((note, index, total) => {
                                    return (
                                        <div className='col-md-6 box'>
                                            <div className='head'>
                                                <div className='title-head'>
                                                    <b>{note.title}</b>
                                                </div>
                                                <div class="dropdown title-icon">
                                                    <button class="btn dropdown-toggle title-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <MoreVert />
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item" onClick={() => editItem(note, total)}>Edit</a></li>
                                                        <li><a class="dropdown-item" /*delItem={note}*/ onClick={() => deleteItem(index)}>Delete</a></li>
                                                        <li><a class="dropdown-item" href='#'>Share</a></li>
                                                    </ul>
                                                </div>

                                                {/* <MoreVert /></p> */}
                                            </div>
                                            <div className='box-content'>
                                                {note.notes.map((item, i) => {
                                                    return (
                                                        <React.Fragment>
                                                            <div className='data' style={{ display: 'flex' }}>
                                                                <input type='checkbox' checked={item.checked} />
                                                                <p style={{ paddingTop: '0px', marginBottom: '0', paddingLeft: '4px' }}>{item.noteTitle}</p>
                                                                <p style={{ paddingTop: '0px', marginBottom: '0', paddingLeft: '14px' }}>{item.amount}</p>
                                                            </div>
                                                        </React.Fragment>
                                                    )
                                                })}
                                            </div>
                                            {/* {inputValues.map((item,i)=>{
                                    return (
                                        <React.Fragment>
                                            <div className='head' key={i}>
                                                <p>{item.title}</p>
                                            </div>
                                            <div className='box-content' style={{display:'flex', marginLeft:'6px'}}>
                                                <input type='checkbox' checked />
                                                <p style={{paddingTop:'0', marginBottom:'0', paddingLeft:'4px'}}>{item.note} {item.amount}</p>
                                            </div>
                                        </React.Fragment>
                                    )
                                })} */}
                                        </div>
                                    )
                                })
                            }
                            {/* <div className='col-md-4 box2'>
                                <div className='head'>

                                </div>
                                <div className='box-content'>

                                </div>
                            </div> */}
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