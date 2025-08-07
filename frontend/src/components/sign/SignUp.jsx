import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import { setHeader, setIsLogedIn } from "../../app/features";
import axios from "axios";
import { Button } from '@mui/material';

export default function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");
    const [isSubmited, setIsSubmited] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validate: (values) => {},
        onSubmit: async (values) => {
            if(!values.name || !values.email || !values.password || !values.confirmPassword) {
                setErrMsg("Fields can't be empty!");
            }
            if((values.password != values.confirmPassword)) {
                setErrMsg("Please Check Your Password!");
                return;
            }

            try {
                setIsSubmited(true);
                const res = await axios.post("http://localhost:5000/user/sign-up", values);
                if(res.status == 200) {
                    const token = res.data.token;
                    localStorage.setItem("token", token);  
                    dispatch(setHeader(token)); 
                    dispatch(setIsLogedIn(true)); 
                    navigate("/");
                }
            } catch (err) {
                setIsSubmited(false);
                console.log(err);
                setErrMsg(err.response.data.msg);
            }
        }
    });
    
    return (
        <div className="lg:h-4/5 w-4/5 mx-auto mt-20 lg:mt-2 p-4 gap-3 flex items-start bg-white  rounded-xl">
            <div 
                style={{background: "linear-gradient(190deg, #0d011a 30%, #3e0480, #6c39cb, #b394f5)"}}
                className="h-full w-10/12 rounded-xl hidden lg:flex lg:items-center">
                <h1
                className="m-5 text-white text-6xl font-bold text-center"
                >Welcome! Join now to chat with your personal AI assistant.</h1>
            </div>
            <div className="lg:w-4/12 w-full h-full flex flex-col items-center justify-center">
                <div className="mb-2 font-bold text-3xl text-gray-700">
                <h1 className="text-center mb-2 font-bold text-3xl text-gray-700">Sign up to <span className="text-indigo-800">QChat</span></h1>                    
                <p className="font-medium mb-4 text-center text-gray-500 text-sm">Please enter your sign up details to create a new account.</p>
                    <form onSubmit={formik.handleSubmit} className="w-full mt-10 px-2 flex flex-col text-base font-medium text-gray-700">
                        <label htmlFor="">
                            <input 
                                className="w-full my-2 p-2 ps-4 text-base border-1 border-gray-400 focus:outline-indigo-800 rounded-md"
                                type="name" 
                                placeholder='Name' 
                                name='name'
                                value={formik.values.name} 
                                onChange={formik.handleChange}
                                required/>
                        </label>
                        <label htmlFor="">
                            <input 
                                className="w-full my-2 p-2 ps-4 border-1 border-gray-400 focus:outline-indigo-800 rounded-md"
                                type="email" 
                                placeholder='Email' 
                                name='email'
                                value={formik.values.email} 
                                onChange={formik.handleChange}
                                required/>
                        </label>
                        <label htmlFor="">
                            <input 
                                className="w-full my-2 p-2 ps-4 border-1 border-gray-400 focus:outline-indigo-800 rounded-md"
                                type="password" 
                                placeholder='Password' 
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                required/>
                        </label>
                        <label htmlFor="">
                            <input 
                                className="w-full my-2 p-2 ps-4 border-1 border-gray-400 focus:outline-indigo-800 rounded-md"
                                type="password" 
                                placeholder='Confirm Password' 
                                name='confirmPassword'
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                required/>
                        </label>
                        <Button 
                            loading={isSubmited} 
                            type='submit' 
                            variant='contained' 
                            style={{backgroundColor: "#6a00ff", fontSize: "1rem", textTransform: "lowercase", marginTop: "0.5rem", padding: "0.3rem 1rem", borderRadius: "0.5rem"}}                            className="self-center"
                            >sign up</Button>
                    </form>
                    <p className="text-red-600">{errMsg}</p>
                    <p className="text-sm font-medium text-gray-500 mt-6">Don't have an Account ? <Link to={"/sign-in"} className="font-medium underline" style={{color: "rgba(0, 0, 200, 0.5)"}}>Click here to sign in</Link></p>                 
                </div>
            </div>
        </div>

    )
}
