import {useEffect, useState} from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { setThreadId, startNewThread, deleteThreadById } from '../../app/features';
import axios from "axios";

export default function Thread({showThread}) {
    const threads = useSelector(state => state.threads);
    const threadId = useSelector(state => state.threadId);
    const headers = useSelector(state => state.headers);
    const [deletingThreadId, setDeletingThreadId] = useState("");
    const dispatch = useDispatch();

    async function deleteThread(threadId) {
        setDeletingThreadId(threadId);
        try {
            let response = await axios.delete(`${import.meta.env.VITE_API_URL}/thread/${threadId}`, {headers});
            if(response.status == 200) {
                dispatch(deleteThreadById(threadId));
                setDeletingThreadId("");
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className={`h-full w-70 z-30 absolute lg:relative lg:w-86 p-2 ${!showThread && "hidden"}`}>
            <div
                style={{backgroundColor: "#0a0a23"}}
                className={`min-h-full lg:w-full ${showThread ? "p-4" : "p-0"} rounded-2xl overflow-x-hidden overflow-y-auto`}>
                <div className="h-16 border-1 flex">
                    <Button 
                        className="">
                            <OpenInNewIcon
                            onClick={() => dispatch(startNewThread())}
                            style={{fontSize: "2rem"}}
                            className="rotate-90 text-white" />
                    </Button>
                    <div className="flex items-center">
                        <h1 
                            className='text-2xl text-gray-300 font-bold cursor-pointer'
                            onClick={() => {setSignIn(0); navigate("/");}}
                            >New Chat</h1>
                    </div>
                </div> 
                <ul className='flex flex-col items-center cursor-pointer text-gray-300'>
                    {   
                        Object.entries(threads).map(([key, obj]) => (
                            <li
                                onClick={() => dispatch(setThreadId(key))}
                                key={key}
                                style={{backgroundColor: "rgba(255, 255, 255, 0.1)", transitionDuration: "0.1s", transitionTimingFunction: "ease-in-out"}} 
                                className={`${key == threadId ? "border-indigo-500" : "border-transparent"}  w-full mt-4 p-2 rounded-xl hover:text-white hover:border-white border-2 overflow-x-auto relative flex`} 
                                ><p 
                                    className='m-0'>{obj.title.slice(0, 20)} {obj.title.length >20 && "..."}</p>

                                <DeleteIcon
                                    onClick={(e) => {deleteThread(key);}}
                                    className={`${key == deletingThreadId && "loadingRed"} text-gray-600 hover:text-red-500 absolute right-2`}/>
                            </li>
                        ))
                    }              
                </ul>
            </div>
        </div>
    );
}
