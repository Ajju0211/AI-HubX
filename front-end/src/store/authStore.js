import { create } from "zustand";
import axios from "axios";
import { useContext } from "react";

// Updated to correct the port number
const API_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api/auth" : "/api/auth";
const API_URL_CHAT = import.meta.env.MODE === "development" ? "http://localhost:3000/api/chat" : "/api/chat";

// Ensure credentials are always sent with requests
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,
  chates: null,
  isVerified: null,
  scrollHide: null,
  ErrorMessage: null,
  chatIndex: null,

  setChatIndex: (chatIndex) => set({ chatIndex }),

  setErrorMessage: (ErrorMessage) => set({ ErrorMessage }),

  setScrollHide: (scrollHide) => set({ scrollHide }),


  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, { email, password, name }, { withCredentials: true });
      set({ user: response.data.user, isVerified: response.data.user.isVerified, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
      set({
        isAuthenticated: true,
        user: response.data.user,
        isVerified: response.data.user.isVerified,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      set({ user: null, isAuthenticated: false, error: null, isLoading: false });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code }, { withCredentials: true });
      set({ user: response.data.user, isVerified: response.data.user.isVerified, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || "Error verifying email", isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/check-auth`, {
        withCredentials: true
      });

      set({ user: response.data.user, isVerified: response.data.user.isVerified, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email }, { withCredentials: true });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error sending reset password email",
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password }, { withCredentials: true });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error resetting password",
      });
      throw error;
    }
  },

  chatResponse: async (user_id, messageId, chat, response) => {
    try {
      const res = await axios.post(`${API_URL_CHAT}/chat-response`, { user_id, messageId, chat, response });
      console.log(res.data);
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error resetting password",
      });
      throw error;
    }
  },

  getChat: async (user_id) => {
    
    try {
      const res = await axios.post(`${API_URL_CHAT}/get-chat`, { user_id });
      set({ chates: res.data });

    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error resetting password",
      });
      throw error;
    }
  },
}));