import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { setSelectedInstructionIdx } from '../../app/features';
import { addInstruction } from '../../app/features';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


export default function Instruction() {
  const dispatch = useDispatch();
  const [newInstruction, setNewInstruction] = useState("");
  const instructions = useSelector(state => state.instructions);
  const selectedInstructionIdx = useSelector(state => state.selectedInstructionIdx);

  return (
    <div
      style={{backgroundColor: "#0a0a23", top: "-22rem", boxShadow: "0 0 3rem black"}} 
      className={`h-90 w-80 m-2 p-4 absolute right-0 z-30 rounded-2xl border-gray-500 border-2 text-gray-300 cursor-pointer`}>
      <div className='flex pb-4'>
        <input 
          type="text" 
          placeholder='Select or Add Instruction'
          className='w-full p-2 mt-2 border-2 border-gray-700 rounded-xl'
          value={newInstruction}
          onChange={(e) => setNewInstruction(e.target.value)}
          />
        <Button 
          style={{backgroundColor: "transparent", borderRadius: "50%", padding: "0px"}}
          variant='contained'
          onClick={() => {console.log("working"); if(newInstruction?.trim()) {dispatch(addInstruction(newInstruction)); setNewInstruction("")}}}
          ><AddCircleOutlineIcon style={{fontSize: "2.5rem", color: "rgba(255, 255, 255, 0.7)"}}/>
        </Button>        
      </div>

      <ul className='h-9/12 list-none overflow-y-auto'>
        {
          instructions.map((val, idx) => (
            <li 
              key={idx}
              style={{backgroundColor: "rgba(255, 255, 255, 0.1)"}} 
              onClick={() => dispatch(setSelectedInstructionIdx(idx))}
              className={`w-full mt-4 p-2 rounded-xl border-2 border-gray-700 hover:text-white overflow-x-auto ${(selectedInstructionIdx == idx) && "border-l-6 border-l-green-600"}`} 
            >{val}</li>))
        }          
      </ul>
    </div>
  )
}
