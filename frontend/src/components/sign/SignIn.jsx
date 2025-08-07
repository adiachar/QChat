import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import { setHeader, setIsLogedIn } from "../../app/features";
import axios from "axios";
import { Button } from '@mui/material';

export default function Sign() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");
    const [isSubmited, setIsSubmited] = useState(false);
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate: () => {},
        onSubmit: async (values) => {
            try {
                setIsSubmited(true);
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/sign-in`, values);
                if(res.status == 200) {
                    const {token} = res.data;
                    localStorage.setItem("token", token); 
                    dispatch(setHeader(token));  
                    dispatch(setIsLogedIn(true));
                    navigate("/");
                }
                
            } catch (err) {
                setIsSubmited(false);
                setErrMsg(err.response.data.msg);
            }
        }
    });
    
    return (
        <div className="lg:h-4/5 w-4/5 mt-20 p-4 mx-auto lg:mt-2 gap-3 flex items-start bg-white  rounded-xl">
            <div 
                style={{background: "linear-gradient(190deg, #0d011a 30%, #3e0480, #6c39cb, #b394f5)"}}
                className="h-full w-10/12 rounded-xl hidden lg:flex lg:items-center">
                <h1 
                    className="m-5 text-white text-6xl font-bold text-center"
                    >Welcome! Join now to chat with your personal AI assistant.</h1>
            </div>
            <div className="lg:w-4/12 w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-center mb-2 font-bold text-3xl text-gray-700">Sign in to <span className="text-indigo-800">QChat</span></h1>
                <p className="font-medium mb-4 text-center text-gray-600 text-sm">Please enter your login details to begin using the app.</p>
                <form onSubmit={formik.handleSubmit} className="w-full px-2 mt-10 flex flex-col text-base font-medium text-gray-700">
                    <label htmlFor="">
                        <input 
                            className="w-full my-2 p-2 ps-4 text-base border-1 border-gray-400 focus:outline-indigo-800 rounded-md"
                            type="email" 
                            placeholder='Email' 
                            name='email'
                            value={formik.values.email} 
                            onChange={formik.handleChange}
                            required/>
                    </label>
                    <label htmlFor="">
                        <input 
                            className="w-full my-3 p-2 ps-4 border-1 border-gray-400 focus:outline-indigo-800 rounded-md"
                            type="password" 
                            placeholder='Password' 
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            required/>
                    </label>
                    <Button 
                        loading={isSubmited}  
                        type='submit' 
                        variant='contained' 
                        style={{backgroundColor: "#6a00ff", fontSize: "1rem", textTransform: "lowercase", marginTop: "0.5rem", padding: "0.3rem 1rem", borderRadius: "0.5rem"}}
                        className=" self-center" 
                        >Login</Button>
                </form>
                <p className="text-red-600">{errMsg}</p>
                <p className="text-sm font-medium text-gray-500 mt-6">Don't have an Account ? <Link to={"/sign-up"} className="font-medium underline" style={{color: "rgba(0, 0, 200, 0.5)"}}>Click here to sign up</Link></p>
            </div>
        </div>
    )
}