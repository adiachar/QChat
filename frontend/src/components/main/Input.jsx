import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {startNewThread, updateThread } from '../../app/features';
import {Button} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import axios from "axios";


export default function Input({setShowInstructions}) {
  const dispatch = useDispatch();
  const instructions = useSelector(state => state.instructions);
  const selectedInstructionIdx = useSelector(state => state.selectedInstructionIdx);
  const threadId = useSelector(state => state.threadId);
  const headers = useSelector(state => state.headers);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleKeyDown(e) {
    if(e.key == "Enter") {
      sendMsg();
    }
  }

  async function sendMsg() {
    if(!message.trim()) {
      return;
    }

    dispatch(updateThread({threadId: threadId, message: {role: "user", content: message}}));
    try {
      const response = await axios.post("http://localhost:5000/chat", {threadId, message, instruction: instructions[selectedInstructionIdx]}, {headers});
      if(response.status == 200) {
        const message = response.data;
        dispatch(updateThread({threadId: threadId, message: message}));
      }
    } catch(err) {
      dispatch(updateThread({threadId: threadId, message: {role: "assistant", content: "Having trouble connecting to the server!"}}));
    }
  }

  return (
    <div className='h-2/12 px-4 pt-4 flex justify-center items-start'>
      <div 
        className="w-full lg:w-1/2 p-2 rounded-xl border-2 border-gray-400 flex"
        style={{backgroundColor: "#0a0b30"}}>
        <input
          style={{backgroundColor: "#0a0a33"}}
          className='w-full p-2 text-white rounded-xl resize-none outline-0'
          placeholder='Your Query' 
          value={message}
          onClick={() => {if(!threadId) {dispatch(startNewThread())}}}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => handleChange(e)}>
        </input>     
        <Button 
          style={{backgroundColor: "rgba(255, 255, 255, 0.1)"}}
          variant='contained' 
          onClick={() => sendMsg()}>
            <ArrowUpwardIcon/>
        </Button>       
      </div>
        <Button 
          style={{backgroundColor: "#0a0a23", marginLeft: "1rem", height: "60px", width: "50px", borderRadius: "50%"}}
          className='hover:scale-110'
          variant='contained' 
          onClick={() => setShowInstructions(i => !i)}>
            <FlashOnIcon/>
        </Button>  
    </div>
  )
}
