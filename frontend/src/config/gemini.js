import { socket } from "../socket/socket";

async function run(prompt, model) {
  return new Promise((resolve, reject) => {
    // Emit the event to the backend
    socket.emit("modelResponse", { prompt, model });

    // Listen for the response once
    socket.once("modelResponse", (modelResponse) => {
      resolve(modelResponse);
    });
    

    // Optional: Handle errors
    socket.once("error", (error) => {
      reject(error);
    });
  });
}

export default run;