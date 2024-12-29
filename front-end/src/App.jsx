import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape"; // Make sure this path is correct

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import AiPage from "./pages/AiPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isVerified,user } = useAuthStore();


  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div
      className="min-h-screen bg-gradient-to-br
    from-gray-900 via-gray-900 to-gray-900 flex items-center justify-center relative overflow-hidden"
    >
      {/* FloatingShape component */}
      <FloatingShape 
        color="bg-red-500" 
        size="w-32 h-32" 
        top="10%" 
        left="15%" 
        delay={0.5}
      />
      
      <FloatingShape 
        color="bg-blue-500" 
        size="w-24 h-24" 
        top="50%" 
        left="50%" 
        delay={2}
      />
      
      <FloatingShape 
        color="bg-green-500" 
        size="w-20 h-20" 
        top="80%" 
        left="70%" 
        delay={1}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AiPage />
            </ProtectedRoute>
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

        <Route
          path="/api/auth/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
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