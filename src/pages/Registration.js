import React, { useState } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {motion} from 'framer-motion'
import {darkLogo} from"../assets/index"
import { Link, useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

function Registration() {
  const auth = getAuth();
const navigate=useNavigate()
const [clientName, setClientName] = useState("")
const [email, setEmail] = useState("")
const [password, setpassword] = useState("")
const [Cpassword, setCpassword] = useState("")

//Error Message start
const [errclientName, setErrClientName] = useState("")
const [erremail, setErrEmail] = useState("")
const [errpassword, setErrpassword] = useState("")
const [errCpassword,setErrCpassword] = useState("")
const [firebaseErr,setFirebaseErr] = useState("")

// Loading state start here

const [Loading,setLoading] = useState(false)
const [successMsg,setSuccessMsg] = useState("")
//handle name function start
const handleName = (e)=>{
  setClientName(e.target.value)
  setErrClientName("")
}
//handle email function start
const handleEmail = (e)=>{
  setEmail(e.target.value)
  setErrEmail("")
}
//handle name function start
const handlePassword = (e)=>{
  setpassword(e.target.value)
  setErrpassword("")
}
//handle name function start
const handleCPassword = (e)=>{
  setCpassword(e.target.value)
  setErrCpassword("")
}
//Email validation start
const emailValidation =(email)=>{
  return String(email).toLowerCase().match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
}

//submit button start
const handleRegistration =(e)=>{
  e.preventDefault()
if(!clientName){
  setErrClientName("Enter Your Name")
}
if(!email){
  setErrEmail("Enter Your Email or Phone Number")
  setFirebaseErr("")
}
else{
  if(!emailValidation(email)){
    setErrEmail("Enter a valid email")
  }
}
if(password.length<6){
  setErrpassword("Passwords must be at least 6 characters")
}
if(!Cpassword){
  setErrCpassword("Confirm your Passworrd")
}
else{if(Cpassword !== password){
  setErrCpassword("Password not matched")
}}
  // console.log(setClientName)

  if(clientName && email && emailValidation(email) && password && password.length>=6 && Cpassword && Cpassword===password){
    console.log(clientName,email,password,Cpassword)
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    updateProfile(auth.currentUser, {
      displayName: clientName,
      photoURL:"https://ik.imagekit.io/ogtjfjjtf/20220925_151704.jpg?updatedAt=1671734010924"
    })
    // Signed in 
    const user = userCredential.user;
    // console.log(user)
    setLoading(false)
    setSuccessMsg("Accunt Created Successfully")
    setTimeout(()=>{navigate("/signin")},3000)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    // const errorMessage = error.message;
    if(errorCode.includes("auth/email-already-in-use")){
      setFirebaseErr("Email Already in use, Try another one")
    }
    console.log(error)
    // ..
  });
    //Firebase registration end her
      setClientName("")
    setEmail("")
    setpassword("")
    setCpassword("")
    setFirebaseErr("")
  }
}
  return (
    <div className='w-full'>
        <div className='w-full bg-gray-100 pb-10'>
            <form className='w-[370px] mx-auto flex flex-col items-center '>
                <img className='w-32 pt-5 mt-2 pb-5' src ={darkLogo} alt='darklogo' />
                <div className='w-full border border-zinc-200 p-6'>
                  <h2 className='font-titleFont text-3xl font-medium mb-4'>Create Account</h2>
                  <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm font-medium'>Your name</p>
                      <input 
                      onChange={handleName}
                      value={clientName}
                      type='text'
                      className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                      />
                      {
                        errclientName && (<p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'>!</span>{errclientName}</p>)
                      }
                    </div>
                    
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm font-medium'>Email or Phone Number</p>
                      <input
                      value={email}
                      onChange={handleEmail}
                      type='text'
                      className='w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                      />
                      {
                        erremail && (<p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'>!</span>{erremail}</p>)
                      }
                       {
                        firebaseErr && (<p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'>!</span>{firebaseErr}</p>)
                      }
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm font-medium'>Password</p>
                      <input
                       value={password}
                       onChange={handlePassword}
                      type='password'
                      className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                      />
                         {
                        errpassword && (<p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'>!</span>{errpassword}</p>)
                      }
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm font-medium'>Re-enter Password</p>
                      <input
                      value={Cpassword}
                       onChange={handleCPassword}
                      type='text'
                      className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                      />
                          {
                        errCpassword && (<p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'>!</span>{errCpassword}</p>)
                      }

                      
                      <p className='text-xs text-gray-600'>Passwords must bet at least 6 characters.</p>
                    </div>
                    <button  onClick={handleRegistration}
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
                    {successMsg &&
                    (<div>
                      <motion.p
                      initial={{y:10, opacity: 0}}
                      animate={{y:0, opacity:1}}
                      transition={{duration:0.5}}
                      className="text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center"
                      >
                        
                        {successMsg}</motion.p>
                    </div>)}
                  </div>
                  <p className='text-xs text-black leading-4 mt-4'>By continuing, you agree to Amazon's <span className='text-blue-600'>Conditions of Use{""}</span > and <span className='text-blue-600'>Privacy Notice.</span></p>
                  <div>
                    <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Already have an account?{""} 
                    <Link to="/signin">
                    <span className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 '>Sign in <span><ArrowRightIcon/></span></span>
                    </Link>
                   </p>
                    <p className='text-xs text-black -mt-2'>Buying for work? <span className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Create a free business account</span></p>
                  </div>
                </div>
            </form>
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

export default Registration