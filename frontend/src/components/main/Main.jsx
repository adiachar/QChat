import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHeader, setIsLogedIn, setThreads } from '../../app/features';
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
  const [showInstructions, setShowInstructions] = useState(false);
  

  useEffect(() => {
    const validateToken = async (token) => {
      const headers = {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/validate-token`, {headers});
        if(response.status == 200) {
          //token is valid
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/threads`, {headers});
          if(response.status == 200) {
            const threads = response.data.threads;
            dispatch(setThreads(threads));
            dispatch(setHeader(token));
            dispatch(setIsLogedIn(true));
          }
        }
      } catch(err) {
        navigate("/sign-in");
        
      }
    }
    validateToken(localStorage.getItem("token"));
  }, []);

  return (
    <div 
      style={{height: "90%"}}
      className="w-screen flex relative">
      {isLoggedIn && <ThreadList showThread={showThread} setShowThread={setShowThread}/>}
      
      <div 
        onClick={() => setShowThread(false)}
        className='h-full w-full flex flex-col justify-between'>
        {threadId ? <Chats/> : <Hero/>}
        <Input showInstructions={showInstructions} setShowInstructions={setShowInstructions} />      
      </div>

      <Instruction showInstructions={showInstructions} className="w-40"/>
    </div>
  )
}
