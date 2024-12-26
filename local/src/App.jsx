import React, { useEffect, useRef, useState } from 'react'

const App = () => {


  const mainRef = useRef(null)

  const [theme, setTheme] = useState(localStorage.getItem('theme') == null?'light':localStorage.getItem('theme'))

  const changeTheme = ()=>{
    
    if(theme == 'light'){
      localStorage.setItem('theme','dark')
      setTheme('dark')
    }else{
      localStorage.setItem('theme','light')
      setTheme('light')
    }

  }

useEffect(function(){
  mainRef.current.setAttribute('id',theme)
},[theme])
  

  return (
    <div>
      <div ref={mainRef} className='h-screen w-full justify-center items-center flex'>
        <div className='flex w-full font-medium fixed justify-between items-center px-10 py-5 top-0 left-0'>
            <h2>Sheryians</h2>
            <div className='flex gap-9 items-center'>
              <h4>About</h4>
              <h4>Contact</h4>
              <h4>Services</h4>
              <h4>Courses</h4>
              <h5 className='bg-black rounded px-4 py-2 text-white' onClick={changeTheme}>Mode</h5>
            </div>
        </div>

        <h1 className='text-6xl font-medium'>Sheryians</h1>
      </div>
    </div>
  )
}

export default App