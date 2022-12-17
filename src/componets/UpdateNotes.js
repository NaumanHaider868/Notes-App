import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import '../componets/update.css';

import { SignalCellularAlt, SignalWifi4Bar, Battery30, ArrowBack, Close, Add }
    from '@mui/icons-material';

import { Navbar, Container } from 'react-bootstrap';

function UpdateNotes() {
    const [inputList, setInputList] = useState([]);
    const [title, setTitle] = useState();
    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const [status,setStatus] = useState(false);
    const [id,setId] = useState();
    const [postid,setPostId] = useState();
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const param = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://foodapis.techenablers.info/api/notes/${param.id}`)
            .then((resp) => {
                console.log('update get',resp.data.data)
                setTitle(resp.data.data.note.title)
                setInputList(resp.data.data.note.checklists)
            })
    }, []);

    const _updateNote = () => {

        let arr = [];

        for(let i = 0; i < inputList.length; i++) {
            arr.push({
                "id": inputList[i].id,
                "post_note_id": inputList[i].postId,
                "name": inputList[i].name,
                "amount": inputList[i].amount,
                "status": inputList[i].status,
            })
        }

        // const payload = {
        //     arr
        // }
        axios.put(`http://foodapis.techenablers.info/api/notes/${param.id}`,{
            title,
            checklists:arr
        })
        .then((resp)=>{
            // console.log('update data',resp.data.data.note)
            setInputList(resp.data.data.note)
        })
        navigate('/');
    }
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setName(list);
        setAmount(list)
    };

    const handleAddClick = () => {
        setInputList([...inputList, {id:id, name: '', amount: '', status : false }])
    };

    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    }

    const AddStauts = (id) => {
        // axios.post(`http://foodapis.techenablers.info/api/notes/${id}`,{
        //     status:status
        // })
        //     .then((resp) => {
        //         console.log(resp.data.data.notestatus);
        //         // setStatus(resp.data.data.notestatus.status)
        //     }) 
        // console.log(id)

        const newVal = inputList.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    status: !item.status,
                };
            } else {
                return {
                    ...item,
                };
            }
        });
        console.log(newVal)
        setStatus(newVal);
        setInputList(newVal)
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
                            <input placeholder='Title' defaultValue={title} name='title' onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <p style={{ color: 'black', marginLeft: '15px' }}>Sum : </p>
                                {inputList && inputList.map((x, i) => {
                                    return (
                                        <React.Fragment>
                                            <div className="head" style={{ /*display: 'flex',*/ justifyContent: 'flexSart', marginTop: '10px' }}>
                                                <div className='inputs'>
                                                    <input type='checkbox' name='status' defaultChecked={x.status} onClick={()=>AddStauts(x.id)} />
                                                    <input type='text' name='name' className='note-input' placeholder='Enter Notes' defaultValue={x.name} onChange={e => handleInputChange(e,i)} />
                                                    <div className='date-time'>
                                                        {date} {time}
                                                    </div>
                                                </div>
                                                <div className='amount-icon'>
                                                    <input type='text' placeholder='Amount' name='amount' className='amount' defaultValue={x.amount} onChange={e => { handleInputChange(e,i) }} />
                                                    <Close onClick={() => { handleRemoveClick() }} />
                                                </div>
                                            </div>
                                        </React.Fragment>

                                    )
                                })
                                }



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

export default UpdateNotes


// 456312270716-amghd2b9hmg6g2inn51hip1pt8gmh486.apps.googleusercontent.com



// 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