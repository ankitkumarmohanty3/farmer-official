
import { useRef, useState,useEffect } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero';
import TrustedBy from './Components/TrustedBy';
import Services from './Components/Services';
import OurWork from './Components/OurWork';
import Teams from './Components/Teams';
import Contactus from './Components/Contactus';
import {Toaster} from 'react-hot-toast'
import Footer from './Components/Footer';

function App() {


const[theme,setTheme]  = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');


  const dotRef  =  useRef(null)
  const outlineRef  =  useRef(null)


  // Refs for custom cursor Position tracking
  const mouse  =  useRef({x:0, y:0})
  const Position  =  useRef({x:0, y:0})

   useEffect(()=>{
       const handleMouseMove  =  (e)=>{
          mouse.current.x = e.clientX
          mouse.current.y = e.clientY
       }
       document.addEventListener('mousemove',handleMouseMove)

       const animate =  ()=>{
          Position.current.x  += (mouse.current.x -  Position.current.x) * 0.1
          Position.current.y  += (mouse.current.y -  Position.current.y) * 0.1

          if(dotRef.current && outlineRef.current){
            dotRef.current.style.transform =  `translate3d(${mouse.current.x - 6}px, ${mouse.current.y - 6}px,0 )`
              outlineRef.current.style.transform =  `translate3d(${Position.current.x - 20}px, ${Position.current.y - 20}px,0 )`
          }

          requestAnimationFrame(animate)
       }

       animate()

       return ()=>{
        document.removeEventListener('mousemove',handleMouseMove)
       }
   },[])
  
   return (
    <div className='dark:bg-black relative'>
      <Toaster />
     <Navbar className='dark:bg-black relative' theme={theme} setTheme={setTheme}/>
      <Hero/>
      <TrustedBy/>
      <Services/>
      <OurWork/>
      <Teams/>
      <Contactus/>
      <Footer theme={theme}/>

      {/* Custom Cursor Ring  */}
      <div ref={outlineRef} className='fixed top-0 left-0 h-10 w-10 rounded-full border border-primary pointer-events-none z-[9999]' style={{transition:'transform 0.1s ease-out'}}></div>
{/* 
      Custom Curosor Dot  */}

      <div ref={dotRef} className='fixed top-0 left-0 h-3 w-3 rounded-full bg-primary pointer-events-none z-[9999]'></div>
    </div> 
  )
}

export default App
