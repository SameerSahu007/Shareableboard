import { useState, useEffect } from 'react'
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import ChatBox from './ChatBox';
import Board from './Board';

const socket = io('http://localhost:3001', {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

export default function Chat() {
  let { roomId } = useParams();
  socket.emit('makeRoom', roomId)
  return (
    <div className='text-[#b2b2ff] h-screen flex flex-row'>
      <Board socket={socket}  />
      <ChatBox socket={socket} roomId={roomId} />
    </div>

  )
}
