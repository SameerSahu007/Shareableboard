import React, { useRef, useEffect, useState} from 'react';
import Stats from './Stats';
import {Socket} from 'socket.io-client';
import ToolBar from './ToolBar';

interface BoardProps {
  socket: Socket;
  roomId: string;
}

const Board:React.FC<BoardProps> = ({ socket, roomId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef<string>("white")
  
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let drawing = false;
    socket.emit('makeRoom', roomId)
    
    canvas.width = canvas.parentElement?.clientWidth ?? 0;
    canvas.height = canvas.parentElement?.clientHeight ?? 0;

    const startDrawing = (e: MouseEvent) => {
      drawing = true;
      const currentColor = colorRef.current
      ctx.strokeStyle = currentColor
      ctx.beginPath();
      const x = e.offsetX;
      const y = e.offsetY;
      ctx.moveTo(x,y);
      socket.emit('drawing', {x,y,type: 'start',roomId, currentColor});
    };

    const draw = (e:MouseEvent) => {
      if (!drawing) return;
      const currentColor = colorRef.current
      ctx.strokeStyle = currentColor
      const x = e.offsetX;
      const y = e.offsetY;
      ctx.lineTo(x, y);
      ctx.stroke();
      socket.emit('drawing', {x,y,type: 'draw',roomId, currentColor});
    };

    const endDrawing = () => {
      drawing = false;
      ctx.closePath();
      socket.emit('drawing', {type: 'end',roomId: roomId});
    };

    const stopDrawing = () => {
      drawing = false;
    };

    socket.on('drawing', (data) => {
      console.log('test socket 2 ')
      ctx.strokeStyle = data.currentColor
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
  },[]);


 

  return (
    <div className='my-2 h-[78%] w-full  pink  mx-auto max-w-xl font-roboto-mono'>
      <Stats socket={socket}/>
      <ToolBar colorRef={colorRef}/>
      <canvas className='border border-blue-900 '  ref={canvasRef} ></canvas>
    </div>
  )
}

export default Board