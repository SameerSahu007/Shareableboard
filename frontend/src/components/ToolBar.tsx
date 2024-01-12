import { useState } from 'react'
import { FaEraser } from "react-icons/fa";

const ToolBar = () => {
    const [selectedColor, setSelectedColor] = useState<String>('white');

    const handleColorClick = (color: string) => {
        console.log(color)
        setSelectedColor(color);
    };

    return (
        <div className='flex my-3 items-center'>
            <div>
                <p>Select Color:</p>
            </div>
            <div
                className={`mx-2 border ${selectedColor === 'white' ? 'border-red-600' : 'border-none'}`}
                onClick={() => handleColorClick('white')}>
                <div className='w-6 h-6 cursor-pointer bg-white'></div>
            </div>
            <div
                className={`mr-2 border ${selectedColor === 'red' ? 'border-white' : 'border-none'}`}
                onClick={() => handleColorClick('red')}>
                <div className='w-6 h-6 cursor-pointer bg-red-600'></div>
            </div>
            <div
                className={`mr-2 border ${selectedColor === 'green' ? 'border-white' : 'border-none'}`}
                onClick={() => handleColorClick('green')}>
                <div className='w-6 h-6 cursor-pointer bg-green-600'></div>
            </div>
            <div
                className={`mr-2 border ${selectedColor === 'yellow' ? 'border-white' : 'border-none'}`}
                onClick={() => handleColorClick('yellow')}>
                <div className='w-6 h-6 cursor-pointer bg-yellow-400'></div>
            </div>
            <div
                className={`mr-2 border ${selectedColor === 'blue' ? 'border-white' : 'border-none'}`}
                onClick={() => handleColorClick('blue')}>
                <div className='w-6 h-6 cursor-pointer bg-blue-600'></div>
            </div>

            <div  className={`mr-2 border ${selectedColor === 'eraser' ? 'border-white' : 'border-none'} w-6 h-6 cursor-pointer pt-[3px] pl-[3px]` }
                onClick={() => handleColorClick('eraser')}>
            <FaEraser color="white" size="1em"/>
            </div>

        </div>
    );
}

export default ToolBar