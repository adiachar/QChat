import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import { setSelectedModel } from '../../app/features';
import PersonIcon from '@mui/icons-material/Person';
import Fab from '@mui/material/Fab';
import {Button} from "@mui/material";
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

export default function Navbar({setShowThread, setSignIn}) {
    const navigate = useNavigate();
    const count = useSelector(state => state.count);
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    return (
        <div 
            style={{backgroundColor: "#0a0a23", height: "10%"}}
            className="w-full flex items-center justify-between p-4 bg-gray-800">
            <div className="flex">
                <div className="">
                    <Button 
                        className=""
                        onClick={() => setShowThread(st => !st)}>
                        <OpenInBrowserIcon 
                            style={{fontSize: "2rem"}}
                            className="rotate-90 text-white" />
                        </Button>
                </div>
                <div className="flex items-center">
                    <h1 
                        className='text-3xl text-gray-300 font-bold cursor-pointer'
                        onClick={() => {setSignIn(0); navigate("/");}}
                        >{count}QChat</h1>
                </div>            
            </div>

            <ul className="flex items-center">
                {isLoggedIn ?
                    <li>
                        <Fab className="" size='small'>
                            <PersonIcon className=""/>
                        </Fab>
                    </li>
                :
                (
                <li>
                    <Button
                        onClick={() => {setSignIn(2); navigate("/sign-in")}}
                        variant='contained' 
                        style={{backgroundColor: "#6a00ff", fontSize: "1rem", textTransform: "lowercase", marginTop: "0.5rem", padding: "0.3rem 1rem", borderRadius: "0.5rem"}}
                        >sign in
                    </Button>
                </li>
                )}
            </ul>
        </div>
    )
}
