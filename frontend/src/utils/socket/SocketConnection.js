/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable-next-line no-unused-vars*/
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getProfile } from '../localstorage';
const SOCKET_URL ='http://localhost:8000';
const ConnectionContext = createContext()
export const ConnectionProvider = (props) => {
  const [socket, setSocket] = useState(null)
  const [pingIntervalId, setPingIntervalId] = useState(null);
  const connectSocket = () => {
    const newSocket = io(SOCKET_URL, { transports: ['websocket'] });
    setSocket(newSocket);
    return newSocket;
  };

  useEffect(() => {
      const newSocket = connectSocket();
      return () => {
        newSocket.disconnect();
      };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', handleConnect);
      socket.on('pong', handlePong);
      socket.on('disconnect', handleDisconnect);
      return () => {
        socket.off('connect', handleConnect);
        socket.off('pong', handlePong);
        socket.off('disconnect', handleDisconnect);
      };
    }
  }, [socket]);

  const handleConnect = () => {
    const newPingIntervalId = setInterval(() => {
      socket.emit('ping');
    }, 5000);
    setPingIntervalId(newPingIntervalId);
  };
  const handlePong = () => {
    console.log('pong')
  };

  const handleDisconnect = () => {
    clearInterval(pingIntervalId);
  };
  useEffect(() => {
    if (socket) {
    socket.emit('add-user',{userId:getProfile()?._id})
  }
},[])
  const value = {
    socket,
    setSocket,
  };

  return (
    <>
      <ConnectionContext.Provider value={value} {...props} />
    </>
  );
};

export const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('useConnection must be used within a ConnectionProvider');
  }
  return context;
};
