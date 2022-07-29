import React from 'react'

const SuccessModal = () => {
  return (
    <div className='w-[50%] bg-info mx-auto absolute top-[30%] left-[20%] rounded-lg shadow-lg'>
        <button onClick={handleMode} className="float-right text-white">close modal</button>
        <div className='h-96 w-[70%] text-white mx-auto'>
            <h1 className='text-black flex flex-col'>Your Appointment was booked successfully</h1>
        </div>
    </div>
  )
}

export default SuccessModal