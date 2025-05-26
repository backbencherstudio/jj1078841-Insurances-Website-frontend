import React from 'react'

export default function page() {
  return (
    <div className=' flex justify-center items-center  min-h-screen'>
        <form action=""   className=' flex flex-col gap-3'>
       
        <input type="text" placeholder='enter OTP here' className=' bg-blue-100 text-black py-3 rounded-xl px-8' />
        <input type="submit" value="Submit" className=' bg-blue-700 text-white py-3 rounded-xl px-8' />

          
        </form>
    </div>
  )
}
