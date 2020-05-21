import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import io from 'socket.io-client';
const socketAdress = 'http://localhost:3003';

// export const Websocket = () => {
//     var socket = io.connect(socketAdress);
//     socket.on('message', function (message) {
//         console.log(message);
//         useDispatch({ type: "SERVER_IS_START" }, true)
//     })
// }

const Websocket = () => {

    const dispatch = useDispatch()
    var socket = require('socket.io-client')(socketAdress);

    socket.on('message', function (message) {
        dispatch({ type: "LOADER_START", value: false })
        dispatch({ type: "SERVER_IS_START", value: true })
    })

    socket.on('disconnect', (reason) => {
        // console.log(reason);
        if (reason === 'io server disconnect') {
            // the disconnection was initiated by the server, you need to reconnect manually
            socket.connect();
        }
        // else the socket will automatically try to reconnect

        dispatch({ type: "SERVER_IS_START", value: false })
    });

    return null
}

export default Websocket;
