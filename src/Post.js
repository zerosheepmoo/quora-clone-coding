import { Avatar } from '@material-ui/core';
import { ArrowDownwardOutlined, ArrowUpwardOutlined, ChatBubbleOutlineOutlined, MoreHorizOutlined, RepeatOneOutlined, ShareOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { selectQuestionId, setQuestionInfo } from './features/questionSlice';
import { selectUser } from './features/userSlice';
import db from './firebase';
import pStyle from './Post.module.css';
import firebase from 'firebase/app';
import 'firebase/firestore';

Modal.setAppElement('#root');

const Post = ({ Id, image, question, timestamp, quoraUser }) => {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const dispatch = useDispatch();
    const [answer, setAnswer] = useState('');
    const user = useSelector(selectUser);
    const questionId = useSelector(selectQuestionId);
    const [getAnswer, setGetAnswer] = useState([]);

    const handleAnswer = (e) => {
        e.preventDefault();
        if (questionId) {
            db.collection('questions').doc(questionId).collection('answer')
                .add({
                    questionId: questionId,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    answer: answer,
                    user: user,
                });

            setAnswer('');
            setIsModalOpened(false);
        }
    }
    useEffect(() => {
        if (questionId) {
            db
                .collection('questions')
                .doc(questionId)
                .collection('answer')
                .orderBy('timestamp', 'desc')
                .onSnapshot(
                    (snapshot =>
                        setGetAnswer(
                            snapshot.docs.map(doc => ({
                                id: doc.id,
                                answers: doc.data()
                            }))
                        )
                    )
                )
        }
    }, [questionId]);

    return (
        <div className={pStyle.post}
            onClick={() => 
                dispatch(setQuestionInfo({
                    questionId: Id,
                    questionName: question
                }))}
        >
            <div className={pStyle['post-info']}>
                <Avatar src={quoraUser.photo} />
                <h5> {quoraUser.displayName ?? quoraUser.email} </h5>
                <small> {new Date(timestamp?.toDate()).toLocaleString()} </small>
            </div>

            <div className={pStyle["post-body"]}>
                <div className={pStyle["post-question"]}>
                    <p> {question} </p>
                    <button className={pStyle["post-btn-answer"]} onClick={() => setIsModalOpened(true)}>답변하기</button>

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
                        <div className={pStyle["modal-question"]}>
                            <h1> {question} </h1>
                            <p>
                                <span className={pStyle["name"]}> {quoraUser.displayName ?? quoraUser.email}</span>
                                로 부터의 질문 <span className="time">{new Date(timestamp?.toDate()).toLocaleString()}</span>
                            </p>
                        </div>
                        <div className={pStyle["modal-answer"]}>
                            <textarea placeholder="답변을 작성해주세요." type="text" value={answer} onChange={e => setAnswer(e.target.value)} />
                        </div>

                        <div className={pStyle["modal-buttons"]}>
                            <button type="submit" className={pStyle["add"]} onClick={(e) => handleAnswer(e)}>답변 달기</button>
                            <button onClick={() => setIsModalOpened(false)} className={pStyle["can"]} >닫기</button>
                        </div>
                    </Modal>
                </div>
                
                <div className={pStyle['post-answer']}>
                    {
                        getAnswer.map(({ id, answers }) =>
                        (
                            <p key={id} style={{ position: "relative", paddingBottom: "5px" }}>
                                {Id === answers.questionId ? (
                                    <span>{answers.answer}
                                        <br />
                                        <span style={{
                                            position: "absolute",
                                            color: "#e4a0f7",
                                            fontSize: "small",
                                            display: "flex",
                                            right: "0px",
                                            top: "0px"
                                        }}> <span style={{ color: "#b92b27" }}>
                                                {answers.user.displayName ?? answers.user.email}
                                            </span>{new Date(answers.timestamp?.toDate()).toLocaleString()} 에 작성됨
                                        </span>
                                    </span>) : (
                                    " "

                                )}
                            </p>
                        )
                        )
                    }
                </div>

                <img src={image} alt="" />
            </div>
            <div className={pStyle["post-footer"]}>
                <div className={pStyle["post-footer-action"]}>
                    <ArrowUpwardOutlined />
                    <ArrowDownwardOutlined />
                </div>
                <RepeatOneOutlined />
                <ChatBubbleOutlineOutlined />
                <div className={pStyle["post-footer-right"]}>
                    <ShareOutlined />
                    <MoreHorizOutlined />
                </div>
            </div>
        </div>
    )
}

export default Post
