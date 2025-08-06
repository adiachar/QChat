import { useState, useEffect } from 'react';
import {Provider, useSelector} from "react-redux";
import { store } from './app/store.js';
import Navbar from './components/navbar/Navbar.jsx';
import Main from './components/main/Main.jsx';
import SignIn from './components/sign/SignIn.jsx';
import SignUp from './components/sign/SignUp.jsx';
import { Route, Routes } from 'react-router-dom';
import './App.css';


function App() {
  const [showThread, setShowThread] = useState(false);
  const [signIn, setSignIn] = useState(0);

  return (
    <div className='App'>
      <Provider store={store}>
        <Navbar setShowThread={setShowThread} setSignIn={setSignIn} signIn={signIn}/>
        <Routes>
          <Route path="/" element={<Main showThread={showThread} setShowThread={setShowThread}/>}/> 
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>       
        </Routes>
      </Provider>
    </div>
  )
}

export default App;