import { Avatar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import './QuoraBox.css';

const QuoraBox = () => {
    const user = useSelector(selectUser)
    return (
        <div className="quora-box">
            <div className="quora-box-info">
                <Avatar src={user.photo}/>
                <h5>{user.displayName}</h5>
            </div>
            <div className="quora-box-quora">
                <p>무엇이 궁금하신가요?</p>
            </div>
        </div>
    )
}

export default QuoraBox
