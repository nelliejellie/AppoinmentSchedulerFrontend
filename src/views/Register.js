import axios from 'axios'
import React, {useState, useEffect} from 'react'
import BounceLoader from "react-spinners/BounceLoader"
import { useNavigate } from 'react-router-dom'


const Register = () => {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [submit, setSubmit] = useState("submit")
  let navigate = useNavigate()
  useEffect(() =>{
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 4000)
  },[])

  const handleSubmit = event => {
    // 👇️ prevent page refresh
    event.preventDefault();
    setSubmit("Submitting...")
    console.log('form submitted ✅');
  };

  // create async request
  const postName = async () =>{
    var bodyFormData = new FormData();
    bodyFormData.append('name', name)

    axios({
      method: "post",
      url: "https://localhost:5001/api/Schedule/AddUsers/",
      data: bodyFormData,
      headers: {"Content-Type": "multipart/form-data"}
    })
      .then((response) =>{
        console.log(response)
        if(response.data.success){
          localStorage.setItem("currentUser", name);
          navigate("/home")
        }
      })
      .catch((response)=>{
        console.log(response)
      });
  }
  return (
    <div className='w-full h-screen bg-primary text-white flex items-center justify-center'>
        {
            loading ?
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-3xl font-bold font-serif'>WELCOME TO YOUR APPOINTMENT SCHEDULER</h2>
                <BounceLoader 
                    color={"#123abc"}
                     
                    size={40} 
                />
            </div>
            :
            <div>
                <form action="post" onSubmit={handleSubmit}>
                    <div className='form-group flex flex-col items-center'>
                        <label className='font-bold'></label>
                        <input type="text" className='form-control' onChange={(e)=>{ setName(e.target.value)}} value={name}  id="exampleInputEmail1" v aria-describedby="emailHelp" placeholder="Enter your full name" />  
                        <button className='w-full bg-success rounded-lg h-10 mt-3' type="submit" onClick={postName}>{submit}</button>  
                    </div>
                </form>
            </div>
        }
    </div>
  )
}

export default Register