import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {startNewThread, updateThread } from '../../app/features';
import Instruction from './Instruction';
import {Backdrop, Button} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import axios from "axios";
import Models from './Models';

export default function Input() {
  const dispatch = useDispatch();
  const instructions = useSelector(state => state.instructions);
  const selectedModel = useSelector(state => state.selectedModel);
  const selectedInstructionIdx = useSelector(state => state.selectedInstructionIdx);
  const threadId = useSelector(state => state.threadId);
  const headers = useSelector(state => state.headers);
  const [message, setMessage] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [showModels, setShowModels] = useState(false);

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
    setMessage("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, {threadId, message, instruction: instructions[selectedInstructionIdx], model: selectedModel}, {headers});
      if(response.status == 200) {
        
        const message = response.data;
        dispatch(updateThread({threadId: threadId, message: message}));
      }
    } catch(err) {
      dispatch(updateThread({threadId: threadId, message: {role: "assistant", content: "Having trouble connecting to the server!"}}));
    }
  }

  return (
    <div className='h-3/12 w-full lg:w-full px-4 pt-2 pb-10 flex justify-center items-center absolute bottom-0'>
      <button
        className={`py-2 px-2 border-3 text-md border-gray-500  rounded-xl mr-2 text-gray-400 font-bold hover:border-gray-600`}
        onClick={() => setShowModels(m => !m)}
        ><p className={`${showModels && "text-gray-300"}`}>Model</p>
      </button>
      {showModels && <Models className="w-40"/>}

      <div
        className="w-full lg:w-1/2 p-2 rounded-xl border-2 border-gray-400 flex"
        style={{backgroundColor: "#0a0b30"}}>
        <input
          style={{backgroundColor: "#0a0a33"}}
          className='w-full p-2 text-white rounded-xl resize-none outline-0'
          placeholder='Your Query' 
          value={message}
          onClick={() => {if(!threadId) {dispatch(startNewThread())}; setShowInstructions(false); setShowModels(false)}}
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

      <button
        className={`p-3 ml-2 border-3 text-md border-gray-500 rounded-full text-gray-400 font-bold hover:border-gray-600`}
        onClick={() => setShowInstructions(i => !i)}>
          <FlashOnIcon className={ showInstructions && `text-indigo-600`}/>
      </button>
      {showInstructions && <Instruction className="w-40"/>}
    </div>
  )
}
