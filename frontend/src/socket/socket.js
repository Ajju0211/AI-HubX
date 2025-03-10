import { io } from 'socket.io-client';


<<<<<<< HEAD
// const  SOCKET_URL =  'https://ai-hubx-env.up.railway.app';
const  SOCKET_URL = import.meta.env.ALLOWED_ORIGIN || 'http://localhost:3000';

=======
const  SOCKET_URL = 'https://ai-hubx.up.railway.app';
>>>>>>> 7c94fbe349240432ebf0a2dad4d94583d025b1e5
export const socket = io(SOCKET_URL, {
    withCredentials: true, // Sends cookies (for authentication)
    autoConnect: false, // Prevents auto-connection; connects only when needed
  }
) 
