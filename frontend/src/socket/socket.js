import { io } from 'socket.io-client';



const  SOCKET_URL = import.meta.env.ENV ==='production' ?  import.meta.env.API_URL : 'http://localhost:3000';

export const socket = io(SOCKET_URL, {
    withCredentials: true, // Sends cookies (for authentication)
    autoConnect: false, // Prevents auto-connection; connects only when needed
  }
) 
