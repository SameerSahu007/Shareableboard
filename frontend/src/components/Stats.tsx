import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Socket } from 'socket.io-client';

interface StatProps {
    socket: Socket;
}

const Stats: React.FC<StatProps> = ({ socket }) => {
    const [userCount, setUserCount] = useState({ count: 0 });
    const buttonText = window.location.href;
    

    socket.on('updateClients', (clientsInRoom) => {
        setUserCount(prevState => {
            return { ...prevState, count: clientsInRoom };
        });
    })

    const handleClick = () => {
        navigator.clipboard.writeText(buttonText)
        toast("Link Copied 😎 !");
    }

    return (<>
        <div className='my-2'>
            <h1 className='text-2xl '>Total users connected: {userCount.count} </h1>
            <h1 className='text-xl '>Share the link below to join more people!</h1>
            <button onClick={handleClick} className="text-white italic">{buttonText}</button>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="dark" />
        </div>
    </>

    )
}

export default Stats