import { useRef, useEffect } from 'react'

export default function Board({socket}) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d');

    const draw = (e) => {
      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      ctx.stroke();
    }

    canvas.addEventListener('mousedown', draw)
  }, []);

  return (
    <>
      <canvas className='border border-red-500' width={300} height={300} ref={canvasRef} ></canvas>
    </>
  )
}
