import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "https://chatify-backend-nwgb.onrender.com";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
  set({ isSigningUp: true });
  try {
    const res = await axiosInstance.post("/auth/signup", data);

    localStorage.setItem("token", res.data.token); // 🔥 ADD THIS

    set({ authUser: res.data.user });

    toast.success("Account created successfully!");

    get().connectSocket();
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    set({ isSigningUp: false });
  }
},


  login: async (data) => {
  set({ isLoggingIn: true });
  try {
    const res = await axiosInstance.post("/auth/login", data);

    // 🔥 SAVE TOKEN
    localStorage.setItem("token", res.data.token);

    set({ authUser: res.data.user });

    toast.success("Logged in successfully");

    get().connectSocket();
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    set({ isLoggingIn: false });
  }
},

  

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response.data.message);
    }
  },

  // connectSocket: () => {
  //   const { authUser } = get();
  //   if (!authUser || get().socket?.connected) return;

  //   const socket = io(BASE_URL, {
  //     withCredentials: true, // this ensures cookies are sent with the connection
  //   });

  //   socket.connect();

  //   set({ socket });

  //   // listen for online users event
  //   socket.on("getOnlineUsers", (userIds) => {
  //     set({ onlineUsers: userIds });
  //   });
  // },

connectSocket: () => {
  const { authUser } = get();

  if (!authUser) return;

  if (get().socket?.connected) return;

  const token = localStorage.getItem("token"); // 🔥 GET TOKEN

  const socket = io(BASE_URL, {
    transports: ["websocket"],
    auth: {
      token, // 🔥 SEND TOKEN
    },
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket error:", err.message);
  });

  socket.on("getOnlineUsers", (userIds) => {
    set({ onlineUsers: userIds });
  });

  set({ socket });
},
disconnectSocket: () => {
  const socket = get().socket;

  if (socket?.connected) {
    socket.disconnect();
    console.log("🔌 Socket disconnected");
  }

  set({ socket: null });
},
//   disconnectSocket: () => {
//     if (get().socket?.connected) get().socket.disconnect();
//   },
}));

