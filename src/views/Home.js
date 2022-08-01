import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import GridLoader from "react-spinners/GridLoader"
import Footer from '../components/Footer';
import axios from 'axios';
import CreateAppointmentModal from '../components/CreateAppointmentModal';
import { nanoid } from 'nanoid';

const Home = () => {
  const user = localStorage.getItem("currentUser")
  const [loading, setLoading] = useState(false)
  const [schedules, setSchedules] = useState([])
  const [openModal, setModal] = useState(false)

  useEffect(()=>{
    getAppointments();
  },[])

  // async data
  const getAppointments = async () =>{
    setLoading(true)
    const response = await axios.get("https://appointmentschedulerapp.herokuapp.com/api/Schedule/GetCoaches/");
    console.log(response.data)
    setSchedules(response.data)
    setLoading(false)
  }
  // handle modal
  const handleModal = () =>{
    setModal(true)
    console.log("modal")
  }
  return (
    <div>
      <div className='h-screen flex flex-col'>
        {/* modal */}
        {
          openModal === true &&
          <CreateAppointmentModal openModal={openModal} setModal={setModal}/>
        }
        
        {/* modal ends */}
        <Navbar/>
            <div className='flex justify-center w-full'>
              <h1 className='font-bold text-3xl mt-3 md:mb-4'>Welcome {user}</h1>
            </div>
            <div className='w-[90%] flex justify-between mx-auto text-white'>
                <button className='bg-success p-2 rounded-lg' onClick={handleModal}>Create an Appointment</button>
                <button className='bg-primary p-2 rounded-lg' onClick={()=>alert("Coming soon...")}>Doctors Portal</button>
            </div>
            {
              loading ? 
              <div className='flex-1 flex flex-col justify-center items-center mt-14'>
                <GridLoader 
                    color={"#123abc"}
                     
                    size={20} 
                />
              </div>
              :

              <table className="table table-hover mx-auto w-[90%] mt-8">
                <thead>
                  <tr>
                    <th scope="col">Doctors Name</th>
                    <th scope="col">WeekDay</th>
                    <th scope="col">Available</th>
                    <th scope="col">Available Until</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    schedules.map(schedule => (
                      <tr key={nanoid()} className="table-success">
                        <th scope="row">{schedule.name}</th>
                        <td>{schedule.weekDay}</td>
                        <td>{schedule.availableAt}</td>
                        <td>{schedule.availableUntill}</td>
                      </tr>
                    ))
                  }
                  
                </tbody>
              </table>
            }
            <Footer/>
          
      </div>
      
    </div>
  )
}

export default Home