import React, { useRef, useEffect} from 'react';
import Stats from './Stats';
import {Socket} from 'socket.io-client';

interface BoardProps {
  socket: Socket;
  roomId: string;
}

const Board:React.FC<BoardProps> = ({ socket, roomId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let drawing = false;
    socket.emit('makeRoom', roomId)

    const startDrawing = (e) => {
      drawing = true;
      ctx.beginPath();
      ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      socket.emit('drawing', {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop,
        type: 'start',
        roomId: roomId
      });
    };

    const draw = (e) => {
      if (!drawing) return;
      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      ctx.stroke();
      socket.emit('drawing', {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop,
        type: 'draw',
        roomId: roomId
      });
    };

    const endDrawing = () => {
      drawing = false;
      ctx.closePath();
      socket.emit('drawing', {
        type: 'end',
        roomId: roomId
      });
    };

    const stopDrawing = () => {
      drawing = false;
    };

    socket.on('drawing', (data) => {
      console.log('test socket 2 ')
      if (data.type === 'start') {
        ctx.beginPath();
        ctx.moveTo(data.x, data.y);
      } else if (data.type === 'draw') {
        ctx.lineTo(data.x, data.y);
        ctx.stroke();
      }
      else {
        ctx.stroke();
      }
    });


    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', endDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
    };
  }, []);


 

  return (
    <div className='my-2 h-screen w-full bg-red pink  mx-auto max-w-xl '>
      <Stats socket={socket}/>
      <canvas className='border border-blue-900' width={600} height={500} ref={canvasRef} ></canvas>
    </div>
  )
}

export default Board