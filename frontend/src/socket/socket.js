import { io } from 'socket.io-client';


const  SOCKET_URL = 'https://ai-hubx.up.railway.app';
export const socket = io(SOCKET_URL, {
    withCredentials: true, // Sends cookies (for authentication)
    autoConnect: false, // Prevents auto-connection; connects only when needed
  }
) 
