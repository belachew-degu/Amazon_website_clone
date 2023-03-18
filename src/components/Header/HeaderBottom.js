import React, { useEffect, useRef, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {motion} from 'framer-motion'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SideNavContent from './SideNavContent';
import { useSelector } from 'react-redux';

function HeaderBottom() {
  const userInfo = useSelector((state)=>state.amazon.userInfo)
    const ref = useRef()
    const [sidebar, setSidebar] = useState(false)
    useEffect(() => {
       document.body.addEventListener("click",(e)=>{
        if(e.target.contains(ref.current)){
            setSidebar(false)
        }
       })
    }, [ref,sidebar])
  return (
    <div className='w-full px-4 h-[36px] bg-amazon_light text-white flex items-center'>
        
                {/*================= List Items Start Here ===================== */}
                <ul className='flex items-center gap-2 text-sm tracking-wide'>
                    <li onClick={()=>setSidebar(true)} className='headerHover flex items-center gap-1'><MenuIcon />All</li>
                    <li className='headerHover hidden md:inline-flex'>One Medical</li>
                    <li className='headerHover hidden md:inline-flex'>Disability Customer Support</li>
                    <li className='headerHover hidden md:inline-flex'>Clinic</li>             
                </ul>
                {/*================= List Items End here ======================= */}
                {/*================= sidenav Start here =========================*/}
                {sidebar && (<div className='w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50'>
                    <div  className='w-full h-full relative'>
                      <motion.div  ref={ref} initial={{x:-500,opacity:0}}
                        animate={{x:0,opacity:1}} transition ={{duration:0.5}} className='w-[80%] md:w-[350px] h-full bg-white border border-black'>
                            <div className='w-full bg-amazon_light text-white py-2  px-6 flex items-center gap-4'>
                                <AccountCircleIcon />
                                {
            userInfo ? (<h3 className='font-titleFont font-bold text-lg tracking-wide'>{userInfo.userName}</h3>):(<h3 className='font-titleFont font-bold text-lg tracking-wide'>Hello, Sign In</h3>)
          }


                                
                            </div>
                       <SideNavContent
                        title="Trending"
                        one="Best Sellers"
                        two="New Releases"
                        three="Movers & Shakers"/>
                       
                         <SideNavContent
                        title="Digital Content & Devices"
                        one=""
                        two=""
                        three=""/>
                        
                          <SideNavContent
                        title="Shop By Department"
                        one=""
                        two=""
                        three=""/>
                        
                          <SideNavContent
                        title="Programs & Features"
                        one=""
                        two=""
                        three=""/>
              
                         <SideNavContent
                        title="Help & Settings"
                        one=""
                        two=""
                        three=""/>            
                        
                        <snap onClick ={()=>setSidebar(false)} className="cursor-pointer absolute top-0 left-[82%] md:left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-300"><CloseIcon /></snap>
                    </motion.div>
                    </div>

                </div>)}
                {/*================= sidenav end here ===========================*/}

    </div>
  )
}

export default HeaderBottom