import React, { useState } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {darkLogo} from"../assets/index"
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/amazonSlic';
// import { MotionConfig } from 'framer-motion';
function Signin() {
  
const auth = getAuth();
const navigate=useNavigate()
const dispatch =useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [erremail, setErrEmail] = useState("")
  const [errpassword, setErrPassword] = useState("")

// firebase Error
const [userEmailErr, setUserEmailErr] = useState("")
const [userPassErr, setPassEmailErr] = useState("")
const [Loading,setLoading] = useState(false)
const [successMsg,setSuccessMsg] = useState("")


  const handleEmail=(e)=>{
    setEmail(e.target.value)
    setErrEmail("")
  }

  const handlePassword=(e)=>{
    setPassword(e.target.value)
    setErrPassword("")
  }

const handleLogin = (e)=>{
  e.preventDefault()
  if(!email){
    setErrEmail("Enter Your email")
  }

  if(!password){
    setErrPassword("Enter your password")
  }

  if(email && password){
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    dispatch(setUserInfo(
      {
        _id:user.uid,
      userName:user.displayName,
      email:user.email,
      image:user.photoURL
      }
    ))
    // ...
    setLoading(false)
    setSuccessMsg("Logged in Successfully! Welcome you back!")
    setTimeout(()=>{navigate("/")},2000)
  })
  .catch((error) => {
    setLoading(false)
    const errorCode = error.code;
    if (errorCode.includes("auth/invalid-email")){
      setUserEmailErr("Invalid Email")
    }
    if (errorCode.includes("auth/wrong-password")){
      setUserEmailErr("Wrong Password! try again")
    }
    // const errorMessage = error.message;
    console.log("Something is up, Try with correct Credentials!")
  }
 
  );
     setEmail("")
    setPassword("")  }
}


  return (
    <div className='w-full'>
     <div className='w-full bg-gray-100 pb-10'>
    {
      successMsg ? (
      <div className='w-full flex justify-center items-center py-32'>
        <p className="border-[1px] text-green-600 border-green-500 font-titleFont text-lg font-semibold px-6 py-2">          
          {successMsg}</p>
      </div>):(
        <form className='w-[350px] mx-auto flex flex-col items-center'>
        <img  className="w-32 mt-2" src={darkLogo} alt="dark logo"/>
        <div className='w-full border-zinc-200 p-6'>
          <h2 className='font-titleFont text-3xl font-medium mb-4'>Sign in</h2>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-2'>
              <p className='text-sm font-medium'> Email or mobile phone number</p>
              <input
              onChange={handleEmail}
              value={email}
              className='w-full  lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600]
              focus-within:shadow-amazonInput duration-100' type='email' />
                {
                        erremail && (<p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'>!</span>{erremail}</p>)
                      }
                         {
                        userEmailErr && (<p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'>!</span>{userEmailErr}</p>)
                      }



            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-sm font-medium'> Password</p>
              <input
              onChange={handlePassword}
              value={password}
              className='w-full  lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600]
              focus-within:shadow-amazonInput duration-100' type='password' />
                 {
                        errpassword && (<p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'>!</span>{errpassword}</p>)
                      }
                       {
                        userPassErr && (<p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'>!</span>{userPassErr}</p>)
                      }
            </div>
            <button onClick={handleLogin}
            className='w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'
            >Continue</button>
                {
                      Loading && (<div className='flex justify-center'>
                        <RotatingLines
                        strokeColor="#febd69"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="50"
                        visible={true}
                      />
                      </div>)
                    }
        
            <p className='text-xs text-black leading-4 mt-4'>By continuing, you agree to Amazon's <span className='text-blue-600'>Conditions of Use{""}</span > and <span className='text-blue-600'>Privacy Notice.</span></p>
            <p className='text-xs text-gray-600 mt-4 cursor-pointer group'><ArrowRightIcon /> <span className='text-blue-600 group-hover:text-orange-700 group-hover:underline-offset-1'>Need help?</span></p>
            
          </div>
          <div className='w-full text-xs text-gray-600 mt-4 flex items-center'>
            <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex '></span>
            <span className='w-1/3 text-center'>New to Amazon?</span>
            <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>            
          </div>
         <Link className='w-full' to='/registration'>
         <button
          className='w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'>Create your Amazon Account</button>
         </Link>
        </div>
      </form>
      )
    }
     </div>
     <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center'>
       <div className='flex items-center gap-6'>
        <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'> Conditions of Use </p>
        <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'> Privacy Notice </p>
        <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>  Help  </p>
       </div>
       <p className='text-xs text-gray-600'>© 1996-2023, Amazon.com, Inc. or its affiliates</p>
     </div>
    </div>
  )
}

export default  Signin