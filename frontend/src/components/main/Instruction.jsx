import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { setSelectedInstructionIdx } from '../../app/features';
import { addInstruction } from '../../app/features';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


export default function Instruction({showInstructions}) {
  const dispatch = useDispatch();
  const [newInstruction, setNewInstruction] = useState("");
  const instructions = useSelector(state => state.instructions);
  const selectedInstructionIdx = useSelector(state => state.selectedInstructionIdx);

  return (
    <div
      style={{backgroundColor: "#0a0a23"}} 
      className={`max-h-full w-80 m-2 p-4 absolute right-0 top-0 rounded-2xl text-gray-300 ${!showInstructions ? "hidden" : "visible"} cursor-pointer`}>
      <div className='flex'>
        <input 
          type="text" 
          placeholder='Select or Add Instruction'
          className='w-full p-2 mt-2 border-2 border-gray-300 rounded-xl'
          value={newInstruction}
          onChange={(e) => setNewInstruction(e.target.value)}
          />
        <Button 
          style={{backgroundColor: "transparent", borderRadius: "50%", padding: "0px"}}
          variant='contained'
          onClick={() => {console.log("working"); if(newInstruction?.trim()) {dispatch(addInstruction(newInstruction)); setNewInstruction("")}}}
          ><AddCircleOutlineIcon style={{fontSize: "2.5rem"}}/>
        </Button>        
      </div>

      <ul className='max-h-60 list-none overflow-y-auto'>
        {
          instructions.map((val, idx) => (
            <li 
              key={idx}
              style={{backgroundColor: "rgba(255, 255, 255, 0.1)"}} 
              onClick={() => dispatch(setSelectedInstructionIdx(idx))}
              className={`w-full mt-4 p-2 rounded-xl border-2 border-gray-400 hover:text-white overflow-x-auto ${(selectedInstructionIdx == idx) && "border-4 border-indigo-600"}`} 
            >{val}</li>))
        }          
      </ul>
    </div>
  )
}
