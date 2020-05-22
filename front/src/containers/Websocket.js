import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
const apisocketAdress = process.env.REACT_APP_REST_API_SOCKET_ADRESS;
// const apisocketAdress = "https://sith-api.hopto.org/sockets/";
const Websocket = () => {

    const dispatch = useDispatch()
    console.log("https://sith-api.hopto.org/sockets")
    var connectionOptions = {
        "force new connection": true,
        "reconnectionAttemps": "Infinity",
        "timeout": 10000,
        "transports": ["websocket"]
    }
    // var socket = require('socket.io-client')(apisocketAdress);
    var socket = io(apisocketAdress, connectionOptions);
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
