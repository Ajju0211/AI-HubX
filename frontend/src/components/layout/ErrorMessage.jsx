import {  ShieldAlertIcon } from "lucide-react";
import React from "react";
import { useAuthStore } from "../../store/authStore";

const ErrorMessage = () => {

    const { ErrorMessage, setErrorMessage} = useAuthStore();

    const closeError = () => {
        setErrorMessage(null);
      };

      
  return (
    <div className="fixed top-0 left-0 right-0 p-5 z-50 flex justify-center">
      <div className="flex bg-[#313131] text-white rounded-lg p-4 shadow-xl w-full max-w-lg items-center">
        <div className="text-3xl mr-4">
            <ShieldAlertIcon />
        </div>
        <div className="flex-1 text-sm">
          <strong className="font-bold">{ErrorMessage}</strong>
        </div>
        <button
          onClick={closeError}
          className="text-white ml-4 text-xl font-semibold"
        >
          X
        </button>
      </div>
    </div>
  );
};


export default ErrorMessage;
