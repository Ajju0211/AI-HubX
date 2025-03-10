import { StrictMode } from "react";
import { createRoot} from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter,unstable_HistoryRouter as HistoryRouter  } from "react-router-dom";
import ContextProvider from "./context/context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
    
  </StrictMode>
);
