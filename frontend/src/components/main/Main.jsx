import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHeader, setIsLogedIn, setModels, setThreads } from '../../app/features';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Hero from './Hero.jsx';
import Input from './Input.jsx';
import Chats from "./Chats.jsx";
import ThreadList from "./ThreadList.jsx";
import Instruction from './Instruction.jsx';

export default function Main({showThread, setShowThread}) {
  const dispatch = useDispatch();
  const threadId = useSelector(state => state.threadId);
  const threads = useSelector(state => state.threads);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const navigate = useNavigate();
  

  useEffect(() => {
    const validateToken = async (token) => {
      const headers = {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
      try {
        const valTokenReq = await axios.get(`${import.meta.env.VITE_API_URL}/user/validate-token`, {headers});
        if(valTokenReq.status == 200) {
          
          const getModelsReq = await axios.get(`${import.meta.env.VITE_API_URL}/models`, {headers});
          if(getModelsReq.status == 200) {
            const models = getModelsReq.data.models;
            dispatch(setModels(models));
          }


          const getThreadsReq = await axios.get(`${import.meta.env.VITE_API_URL}/threads`, {headers});
          if(getThreadsReq.status == 200) {
            const threads = getThreadsReq.data.threads;
            dispatch(setThreads(threads));
            dispatch(setHeader(token));
            dispatch(setIsLogedIn(true));
          }
        }
      } catch(err) {
        navigate("/sign-in");
        
      }
    }
    // validateToken(localStorage.getItem("token"));
  }, []);

  return (
    <div 
      style={{height: "90%"}}
      className="w-screen flex relative">
      {isLoggedIn && <ThreadList showThread={showThread} setShowThread={setShowThread}/>}
      
      <div 
        onClick={() => setShowThread(false)}
        className='h-full w-full flex flex-col justify-between relative'>
        {(threadId && threads[threadId].messages.length > 1) ? <Chats/> : <Hero/>}
        <Input/>      
      </div>
    </div>
  )
}
