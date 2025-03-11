import { Navigate, Route, Routes } from "react-router-dom";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import AiPage from "./pages/AiPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import LoadingSpinner from "./components/layout/LoadingSpinner";
import AihubX from "./pages/Aihubx";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";



// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isVerified } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  // If authenticated and verified, redirect to home page
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/Ai-HubX" replace />;
  }

  return children;
};


function App() {

  
  const { isCheckingAuth, checkAuth, scrollHide } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;



  return (
    <div className={`bg-black ${scrollHide ? 'h-screen w-screen overflow-hidden': '' }  `}>
      <Routes>
        <Route
          path="/"
          element={
            <AihubX />
          }
        >
          <Route
          path="/api/auth/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
        path="/signup"
        element={
          <RedirectAuthenticatedUser>
            <SignUpPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        
        </Route>
        <Route
          path="/inova.ai"
          element={
            
            <ProtectedRoute>
              <AiPage />
            </ProtectedRoute>
          }
        />
        {/* catch all routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;