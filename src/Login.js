import { Button } from '@material-ui/core';
import { ArrowForwardIos } from '@material-ui/icons';
import React, {useState} from 'react';
import { auth, provider } from './firebase';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const signIn = () => {
        auth.signInWithPopup(provider).catch((e) => alert(e.message));
    }
    const handleLogin = (e) => {
        e.preventDefault();
        const fSign = async () => {
            await auth.signInWithEmailAndPassword(email, pw);
        }
        fSign().catch(e => alert(e.message));

        // 초기화
        setEmail('');
        setPw('');
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const fRegi = async () => {
            const fAuth = await auth.createUserWithEmailAndPassword(email, pw);
            console.log(fAuth);
        }
        fRegi().catch(e => alert(e.message));
        
        setEmail('');
        setPw('');
    }
    return (
        <div className="login">
            <div className="login-container">
                <div className="login-logo">
                    <img src="https://qph.fs.quoracdn.net/main-qimg-d049946241e53481209a8938b70321e0" alt=""></img>
                </div>

                <div className="login-desc">
                    <p> Zerosheepmoo의 클론코딩</p>
                    <h3> 뿌바바방! </h3>
                </div>

                <div className="login-auth">
                    <div className="login-auth-options">
                        <div className="login-auth-option">
                            <img className="login-external-auth" src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg" alt="" />
                            <p onClick={e => signIn()}> 구글 아이디로 로그인 </p>
                        </div>

                        <div className="login-auth-option">
                            <img className="login-external-auth"
                                src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png"
                                alt="" />
                            <p> 페이스북 아이디로 로그인 </p>
                        </div>

                        <div className="login-auth-desc">
                            <p>
                                <span style={{ color: "blue", cursor: "pointer" }}>
                                    이메일로 회원가입
                                </span>
                                시 본사의 {' '}
                                <span style={{ color: "blue", cursor: "pointer" }}>
                                    개인정보정책{" "}
                                </span>
                                과 {" "}
                                <span style={{ color: "blue", cursor: "pointer" }}>
                                    서비스 제공 정책
                                </span>
                                에 동의하는 것으로 간주합니다
                            </p>
                        </div>
                    </div>

                    <div className="login-email-pass">
                        <div className="login-label">
                            <h4>로그인</h4>
                        </div>
                        <div className="login-input-fields">
                            <div className="login-input-field">
                                <input type="text" placeholder="Email@example.com" value={email} onChange={e => setEmail(e.target.value)}></input>
                            </div>
                            <div className="login-input-field">
                                <input type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="login-forg-btn">
                            <small> 비밀번호 찾기 </small>
                            <Button onClick={ (e) => handleLogin(e)}>로그인</Button>
                        </div>
                        <Button onClick={(e) => handleRegister(e)}>회원가입</Button>
                    </div>
                </div>

                <div className="login-lang">
                    <p> 언어 설정 </p>
                    <ArrowForwardIos fontSize="small" />
                </div>
                <div className="login-footer">
                    <p>About</p>
                    <p>오시는길</p>
                    <p>비지니스문의</p>
                    <p>구독과 좋아요</p>
                    <p>눌러드렸습니당</p>
                    <p>&copy; 리액트 깎는 백수</p>
                    <p>&copy; modified by zerosheepmoo</p>
                </div>
            </div>
        </div>
    )
}

export default Login
