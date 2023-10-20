import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Home() {
  let navigate = useNavigate();
  const getid = () => {
    axios.get('https://whiteboard-vj7y.onrender.com/getid')
      .then((response) => {
        const redirUrl = 'chat/' + response.data.roomName
        return navigate(redirUrl)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <>
      <div className='h-screen font-roboto  flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center '>
          <h1 className='text-[#b2b2ff] text-6xl '>Hello :3</h1>
          <button className='text-white p-2 rounded my-4 bg-[#b2b2ff]' onClick={getid}>
            Create Board
          </button>
        </div>
      </div>

    </>

  )
}