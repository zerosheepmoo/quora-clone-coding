import { Avatar, Button, Input } from '@material-ui/core';
import { AssignmentIndOutlined, BorderAllRounded, ExpandMore, Home, Language, NotificationsOutlined, PeopleAltOutlined, PeopleOutlined, Search, Link } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './Navbar.css'
import Modal from 'react-modal';

const Navbar = () => {

    const user = useSelector(selectUser);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [input, setInput] = useState('');
    const [inputURL, setInputURL] = useState('');

    const askQuestion = (e) => {
        e.preventDefault();
        setIsModalOpened(false);
        db.collection('questions').add({
            question: input,
            imageURL: inputURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user
        });
        setInput('');
        setInputURL('');
    }

    return (
        <div className='navbar'>
            <div className='qheader-logo'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/1024px-Quora_logo_2015.svg.png' alt='quora-logo' />
            </div>
            <div className='qheader-icons'>
                <div className='qheader-icon'>
                    <Home />
                </div>
                <div className='qheader-icon'>
                    <BorderAllRounded />
                </div>
                <div className='qheader-icon'>
                    <AssignmentIndOutlined />
                </div>
                <div className='qheader-icon'>
                    <PeopleOutlined />
                </div>
                <div className='qheader-icon'>
                    <NotificationsOutlined />
                </div>
            </div>

            <div className="qheader-search-input">
                <input type="text" placeholder="search..."></input>
                <Search />
            </div>
            <div className="qheader-rem">
                <div className="qheader-avatar">
                    <Avatar src={user.photo} onClick={() => auth.signOut()} />
                </div>
                <Language />
                <Button onClick={() => setIsModalOpened(true)}>질문하기</Button>
                <Modal
                    isOpen={isModalOpened}
                    onRequestClose={() => setIsModalOpened(false)}
                    shouldCloseOnOverlayClick={false}
                    style={
                        {
                            overlay: {
                                width: 700,
                                height: 600,
                                backgroundColor: "rgba(0,0,0,0.8)",
                                zIndex: "1000",
                                top: "50%",
                                left: "50%",
                                marginTop: "-300px",
                                marginLeft: "-350px",
                            }
                        }
                    }
                >
                    <div className="modal-title">
                        <h5> 질문 </h5>
                        <h5> 공유하기 </h5>
                    </div>
                    <div className="modal-info">
                        <Avatar src={user.photo} />
                        <p>질문자: {user.displayName ?? user.email}</p>

                        <div className="modal-scope">
                            <PeopleAltOutlined />
                            <p> 전체공개 </p>
                            <ExpandMore />
                        </div>
                    </div>

                    <div className="modal-field">
                        <Input type="text" placeholder="6하 원칙으로 작성해주세요." required value={input} onChange={(e) => setInput(e.target.value)} />
                        <div className="modal-field-link">
                            <Link />
                            <Input type="text" placeholder="url 링크만을 작성해 주세요." value={inputURL} onChange={(e) => setInputURL(e.target.value)} />
                        </div>
                    </div>

                    <div className="modal-buttons">
                        <button type="text" className="add" onClick={(e) => askQuestion(e)}>질문하기</button>
                        <button onClick={() => setIsModalOpened(false)} className="can" >닫기</button>
                    </div>
                </Modal>
            </div>
        </div>

    )
}

export default Navbar
