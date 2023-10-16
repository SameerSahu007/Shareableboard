const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('A user connected')
    socket.on('message', (message) => {
        socket.join(roomId)
        io.to(message.roomId).emit('receivedMsg', message.msg);
    });

    socket.on('makeRoom', ({ roomId }) => {
        socket.join(roomId)
    })

    socket.on('drawing', (draw) => {
        console.log(draw)
        socket.join(draw.roomId)
        socket.broadcast.to(draw.roomId).emit('drawing', draw);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.get('/getid', (req, res) => {
    const length = 6;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    res.send({ roomName: result });
})

httpServer.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
