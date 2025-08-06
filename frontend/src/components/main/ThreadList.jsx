import {useEffect, useState} from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setThreadId, startNewThread } from '../../app/features';

export default function Thread({showThread}) {
    const threads = useSelector(state => state.threads);
    const dispatch = useDispatch();

    return (
        <div className={`h-full w-70 z-30 absolute lg:relative lg:w-86 p-2 ${!showThread && "hidden"}`}>
            <div
                style={{backgroundColor: "#0a0a23"}}
                className={`max-h-full lg:w-full ${showThread ? "p-4" : "p-0"} rounded-2xl overflow-x-hidden overflow-y-auto`}>
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
                                key={key}
                                onClick={() => dispatch(setThreadId(key))}
                                style={{backgroundColor: "rgba(255, 255, 255, 0.1)", transitionDuration: "0.2s", transitionTimingFunction: "ease-in-out"}} 
                                className='w-full mt-4 p-2 rounded-xl hover:text-white hover:border-white border-2 border-transparent overflow-x-auto' 
                                >{obj.title}
                            </li>
                        ))
                    }              
                </ul>
            </div>
        </div>
    );
}
