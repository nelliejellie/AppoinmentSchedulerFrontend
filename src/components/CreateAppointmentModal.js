import axios from 'axios'
import React, {useState} from 'react'
import {MdCancel} from 'react-icons/md'

const CreateAppointmentModal = ({openModal, setModal}) => {
  const [selected, setSelected] = useState("Christy Schumm")
  const [doctorsSchedule, setDoctorsSchedule] = useState([])
  const [selectWeekday, setSelectedWeek] = useState("Monday")
  const [setTime, setSelectedTime] = useState([])
  const [showDoctorTimeAndWeek, setShowDoctorTimeAndWeek] = useState("showDoctor")
  const [TimeSelected, setTimeSelected] = useState("")
  const [error, setErrorResponse] = useState("")
  const handleMode = () =>{
    setModal(!openModal)
  }
  // get selected doctor and schedule
  const handleSubmit = (e) =>{
    e.preventDefault()
    var bodyFormData = new FormData();
    bodyFormData.append('name', selected)

    axios({
      method: "post",
      url: "https://appointmentschedulerapp.herokuapp.com/api/Schedule/coachSchedule/",
      data: bodyFormData,
      headers: {"Content-Type": "multipart/form-data"}
    })
      .then((response) =>{
        console.log(response.data)
        setDoctorsSchedule(response.data)
      })
      .catch((response)=>{
        console.log(response)
      });
      
      setShowDoctorTimeAndWeek("showDay")
  }
  // handle day
  const handleSubmitDay = (e) =>{
    e.preventDefault()
    setShowDoctorTimeAndWeek("showTime")
    var bodyFormData = new FormData();
    bodyFormData.append('name', selected)
    bodyFormData.append('Day', selectWeekday)

    axios({
      method: "post",
      url: "https://appointmentschedulerapp.herokuapp.com/api/Schedule/time/",
      data: bodyFormData,
      headers: {"Content-Type": "multipart/form-data"}
    })
      .then((response) =>{
        console.log(response.data)
        setSelectedTime(response.data)
      })
      .catch((response)=>{
        console.log(response)
        if(response.message === "Request failed with status code 400"){
          alert(`${selected} doesnt work on ${selectWeekday}`)
          setShowDoctorTimeAndWeek("errorModal")
          setErrorResponse(response.response.data.message)
          setModal(false)
        }
      });
  }
  const handleSubmitTime = (e) =>{
    e.preventDefault()
    var bodyFormData = new FormData();
    bodyFormData.append('DoctorsName', selected)
    bodyFormData.append('Day', selectWeekday)
    bodyFormData.append('Time', TimeSelected)
    bodyFormData.append('name', localStorage.getItem('currentUser'))
    console.log(TimeSelected)

    axios({
      method: "post",
      url: "https://appointmentschedulerapp.herokuapp.com/api/Appointment/AddAppointment/",
      data: bodyFormData,
      headers: {"Content-Type": "multipart/form-data"}
    })
      .then((response) =>{
        console.log(response.data)
        setShowDoctorTimeAndWeek("successModal")
      })
      .catch((response)=>{
        console.log(response)
        setShowDoctorTimeAndWeek("errorModal")
        setErrorResponse(response.response.data.message)
      });
  }
  return (
    <div className='w-[50%] bg-info mx-auto absolute top-[30%] left-[20%] rounded-lg shadow-lg'>
        <button onClick={handleMode} className="float-right text-white text-3xl"><MdCancel /></button>
         {
            showDoctorTimeAndWeek === "showDoctor" ?
            <div className='h-96 w-[70%] text-white mx-auto'>
                <form action="post" className='text-black flex flex-col'>
                    <select className='h-10 mt-20' onChange={(e)=>{ setSelected(e.target.value)}} value={selected}>
                        <option value="Christy Schumm">Christy Schumm</option>
                        <option value="Natalia Stanton Jr.">Natalia Stanton Jr.</option>
                        <option value="Nola Murazik V">Nola Murazik V</option>
                        <option value="Elyssa O'Kon">Elyssa O'Kon</option>
                        <option value="Dr. Geovany Keebler"></option>
                    </select>
                    <button className='w-full bg-success rounded-lg h-10 mt-3' type="submit" onClick={handleSubmit}>Select Doctor</button>
                </form>
                
            </div>
          
            :

            showDoctorTimeAndWeek === "showDay" ?
            <div className='h-96 w-[70%] text-white mx-auto'>
              <form action="post" className='text-black flex flex-col'>
                    <select className='h-10 mt-20' onChange={(e)=>{ setSelectedWeek(e.target.value)}} value={selectWeekday}>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                    </select>
                    <button className='w-full bg-success rounded-lg h-10 mt-3' type="submit" onClick={handleSubmitDay}>Select Day</button>
                </form>
            </div>

            :
            showDoctorTimeAndWeek === "showTime" ?
            <div className='h-96 w-[70%] text-white mx-auto'>
              <form action="post" className='text-black flex flex-col'>
                    <select className='h-10 mt-20' onChange={(e)=>{ setTimeSelected(e.target.value)}} value={TimeSelected}>
                        {
                            setTime.map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))
                        }
                    </select>
                    <button className='w-full bg-success rounded-lg h-10 mt-3' type="submit" onClick={handleSubmitTime}>Make Appointment</button>
                </form>
            </div>

            :
            showDoctorTimeAndWeek === "successModal" ?
            <div className='h-96 w-[100%] text-white flex justify-center text-center items-center font-bold text-2xl mx-auto'>
              <h1 className=''>Your Appointment was booked successfully</h1>
            </div>

            :

            
            <div className='h-96 w-[100%] text-white flex justify-center text-center items-center font-bold text-2xl mx-auto'>
              <h1 className=''>{error}</h1>
            </div>

        }
        
    </div>
  )
}

export default CreateAppointmentModal