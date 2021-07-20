import firebase from 'firebase/app';
import 'firebase/installations';
import 'firebase/auth';
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAerWFNYm2CaajNttVnMUrQFnx5l9Sa4xs",
    authDomain: "quora-clone-60c2a.firebaseapp.com",
    projectId: "quora-clone-60c2a",
    storageBucket: "quora-clone-60c2a.appspot.com",
    messagingSenderId: "663237872162",
    appId: "1:663237872162:web:15f822357e80922b46d87b",
    measurementId: "G-Z1MHSX11N1"
};

// app 초기화
const firebaseApp = firebase.initializeApp(firebaseConfig);

// 인증
const auth = firebase.auth()

// 구글 인증 프로파이더
const provider = new firebase.auth.GoogleAuthProvider()

// 디비는 파이어스토어에서
const db = firebaseApp.firestore()

// 인증이랑 프로바이더 엑스포트
export { auth, provider }

export default db