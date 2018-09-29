const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {Users} = require('./utils/users');
const {isRealString} = require('./utils/validation');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

let users = new Users();

app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New user Connected');

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
           return callback('Name and room name are required.');
        }

        socket.join(params.room);
        // socket.leave('the offcie fans);
        // io.emit -> io.to('the office fans').emit
        // socket broadcast.emit -> socket.broadcast.to.('the office fans).emit
        // socket.emit
        //socket.emit from Admin text Welcome to the chat app

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        console.log('hello')

        socket.emit('newMessage', generateMessage('Admin', `Welcome to the chat app`));
        //socket.broadcast.emit from Admin text New user joined
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

        callback()
    })

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} had left.`));
        }
        console.log('Disconnect from server!')
    });
    
});



server.listen(port, ()=> {
    console.log(`Server up on port ${port}`);
})