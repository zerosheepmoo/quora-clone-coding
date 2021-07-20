import React, {useEffect} from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, login, logout } from './features/userSlice';
import Quora from './Quora';
import Login from './Login';
import { auth } from './firebase';

function App() {
  // useSelector: redux의 상태값 조회하기 위한 훅
  // useState 확장형
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(login(
          {
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email
          }));
      }
      else {
        dispatch(logout())
      }
    });
  }, [dispatch])

  return (
    <div className="App">
      { user ?  <Quora/> : <Login/>}
    </div>
  );
}

export default App;
