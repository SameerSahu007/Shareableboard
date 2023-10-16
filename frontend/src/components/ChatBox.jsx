import { useState } from "react";

export default function ChatBox({ socket, roomId }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = (e) => {
    e.preventDefault()
    if (inputText.trim() !== '') {
      // setMessages([...messages, inputText ]);
      const message = {
        msg: inputText,
        roomId: roomId
      }
      socket.emit('message', message)
      setInputText('');
    }
  };

  socket.on('receivedMsg', (text) => {
    console.log(text)
    setMessages([...messages, text])
  })

  return (
    <>
      <div className="w-60 h-[95%] border-2 border-black rounded m-2">
        <div className=" bg-purple-300 h-4/5 ">
          <h1 className="text-white text-4xl text-center text-bold border-b-2 border-white-500 ">Chats</h1>
          {messages.map((message, index) => (
            <div className="text-purple-300 text-xl bg-white my-2 mx-2 p-2 rounded">{message}</div>
          ))}

        </div>

        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-extrabold">Chat Here</h1>
          <form onSubmit={sendMessage} className="flex flex-col">
            <input type="text" placeholder='Enter your text here...'
              className="border-2 border-purple-200 rounded my-2 py-1"
              value={inputText} onChange={(e) => setInputText(e.target.value)} />
            <button className="  bg-purple-500 text-white rounded p-2 text-center">Send ✍</button>
          </form>
        </div>
      </div>
    </>
  );
}
