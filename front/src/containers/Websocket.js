import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
const socketAdress = 'http://localhost:3003';
const apisocketAdress = process.env.REACT_APP_REST_API_SOCKET_ADRESS;

const Websocket = () => {

    const dispatch = useDispatch()
    var socket = require('socket.io-client')(apisocketAdress);

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
