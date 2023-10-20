import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import ChatBox from './ChatBox';
import Board from './Board';

const socket = io('https://whiteboard-vj7y.onrender.com', {
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
      <Board socket={socket} roomId={roomId} />
      <ChatBox socket={socket} roomId={roomId} />
    </div>

  )
}
