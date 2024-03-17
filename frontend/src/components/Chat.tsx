import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import ChatBox from './ChatBox';
import Board from './Board';

const baseurl:string = process.env.REACT_APP_BASE_URL!

const socket = io(baseurl, { transports : ['websocket'] });

export default function Chat() {
  let { roomId } = useParams();
  socket.emit('makeRoom', roomId)
  return (
    <div className='text-[#b2b2ff]  flex bg-black'>
      <div className='h-screen flex mx-auto'>
      <Board socket={socket} roomId={roomId as string} />
      <ChatBox socket={socket} roomId={roomId as string } />
      </div>

    </div>

  )
}
