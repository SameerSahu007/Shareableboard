import React, { useRef, useEffect} from 'react';
import Stats from './Stats';
import {Socket} from 'socket.io-client';
import ToolBar from './ToolBar';

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

    canvas.width = canvas.parentElement?.clientWidth ?? 0;
    canvas.height = canvas.parentElement?.clientHeight ?? 0;


    const startDrawing = (e: MouseEvent) => {
      drawing = true;
      ctx.beginPath();
      const x = e.offsetX;
      const y = e.offsetY;
      ctx.moveTo(x,y);
      socket.emit('drawing', {
        x: x,
        y: y,
        type: 'start',
        roomId: roomId
      });
    };

    const draw = (e:MouseEvent) => {
      if (!drawing) return;
      const x = e.offsetX;
      const y = e.offsetY;
      ctx.lineTo(x, y);
      ctx.stroke();
      socket.emit('drawing', {
        x: x,
        y: y,
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
    <div className='my-2 h-[78%] w-full  pink  mx-auto max-w-xl font-roboto-mono'>
      <Stats socket={socket}/>
      <ToolBar />
      <canvas className='border border-blue-900 '  ref={canvasRef} ></canvas>
    </div>
  )
}

export default Board