// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";
// import { useAuthStore } from "./useAuthStore";

// export const useChatStore = create((set, get) => ({
//   allContacts: [],
//   chats: [],
//   messages: [],
//   activeTab: "chats",
//   selectedUser: null,
//   isUsersLoading: false,
//   isMessagesLoading: false,
//   isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

//   toggleSound: () => {
//     localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
//     set({ isSoundEnabled: !get().isSoundEnabled });
//   },

//   setActiveTab: (tab) => set({ activeTab: tab }),
//   setSelectedUser: (selectedUser) => set({ selectedUser }),

//   getAllContacts: async () => {
//     set({ isUsersLoading: true });
//     try {
//       const res = await axiosInstance.get("/messages/contacts");
//       set({ allContacts: res.data });
//     } catch (error) {
//       toast.error(error.response.data.message);
//     } finally {
//       set({ isUsersLoading: false });
//     }
//   },
//   getMyChatPartners: async () => {
//     set({ isUsersLoading: true });
//     try {
//       const res = await axiosInstance.get("/messages/chats");
//       set({ chats: res.data });
//     } catch (error) {
//       toast.error(error.response.data.message);
//     } finally {
//       set({ isUsersLoading: false });
//     }
//   },

//   getMessagesByUserId: async (userId) => {
//     set({ isMessagesLoading: true });
//     try {
//       const res = await axiosInstance.get(`/messages/${userId}`);
//       set({ messages: res.data });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     } finally {
//       set({ isMessagesLoading: false });
//     }
//   },

//   // sendMessage: async (messageData) => {
//   //   const { selectedUser, messages } = get();
//   //   const { authUser } = useAuthStore.getState();

//   //   const tempId = `temp-${Date.now()}`;

//   //   const optimisticMessage = {
//   //     _id: tempId,
//   //     senderId: authUser._id,
//   //     receiverId: selectedUser._id,
//   //     text: messageData.text,
//   //     image: messageData.image,
//   //     createdAt: new Date().toISOString(),
//   //     isOptimistic: true, // flag to identify optimistic messages (optional)
//   //   };
//   //   // immidetaly update the ui by adding the message
//   //   set({ messages: [...messages, optimisticMessage] });

//   //   try {
//   //     const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
//   //     set({ messages: messages.concat(res.data) });
//   //   } catch (error) {
//   //     // remove optimistic message on failure
//   //     set({ messages: messages });
//   //     toast.error(error.response?.data?.message || "Something went wrong");
//   //   }
//   // },

//   sendMessage: async (messageData) => {
//   const { selectedUser, messages } = get();
//   const { authUser } = useAuthStore.getState();

//   const tempId = `temp-${Date.now()}`;

//   const optimisticMessage = {
//     _id: tempId,
//     senderId: authUser._id,
//     receiverId: selectedUser._id,
//     text: messageData.text,
//     image: messageData.image,
//     audio: messageData.audio ? URL.createObjectURL(messageData.audio) : null, // ✅ preview audio
//     createdAt: new Date().toISOString(),
//     isOptimistic: true,
//   };

//   // ✅ show instantly
//   set({ messages: [...messages, optimisticMessage] });

//   try {
//     let dataToSend;

//     // ✅ IF AUDIO EXISTS → use FormData
//     if (messageData.audio) {
//       dataToSend = new FormData();

//       if (messageData.text) dataToSend.append("text", messageData.text);
//       if (messageData.image) dataToSend.append("image", messageData.image);
//       dataToSend.append("audio", messageData.audio);

//     } else {
//       // ✅ normal text/image
//       dataToSend = messageData;
//     }

//     const res = await axiosInstance.post(
//       `/messages/send/${selectedUser._id}`,
//       dataToSend,
//       {
//         headers: messageData.audio
//           ? { "Content-Type": "multipart/form-data" }
//           : {},
//       }
//     );

//     // ✅ replace optimistic with real
//     set({
//       messages: get().messages.map((msg) =>
//         msg._id === tempId ? res.data : msg
//       ),
//     });

//   } catch (error) {
//     // ❌ rollback
//     set({ messages: messages });
//     toast.error(error.response?.data?.message || "Something went wrong");
//   }
// },

//   subscribeToMessages: () => {
//     const { selectedUser, isSoundEnabled } = get();
//     if (!selectedUser) return;

//     const socket = useAuthStore.getState().socket;

//     socket.on("newMessage", (newMessage) => {
//       const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
//       if (!isMessageSentFromSelectedUser) return;

//       const currentMessages = get().messages;
//       set({ messages: [...currentMessages, newMessage] });

//       if (isSoundEnabled) {
//         const notificationSound = new Audio("/sounds/notification.mp3");

//         notificationSound.currentTime = 0; // reset to start
//         notificationSound.play().catch((e) => console.log("Audio play failed:", e));
//       }
//     });
//   },

//   unsubscribeFromMessages: () => {
//     const socket = useAuthStore.getState().socket;
//     socket.off("newMessage");
//   },
// }));


// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";
// import { useAuthStore } from "./useAuthStore";

// export const useChatStore = create((set, get) => ({
//   allContacts: [],
//   chats: [],
//   messages: [],
//   activeTab: "chats",
//   selectedUser: null,
//   isUsersLoading: false,
//   isMessagesLoading: false,
//   isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

//   toggleSound: () => {
//     localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
//     set({ isSoundEnabled: !get().isSoundEnabled });
//   },

//   setActiveTab: (tab) => set({ activeTab: tab }),
//   setSelectedUser: (selectedUser) => set({ selectedUser }),

//   getAllContacts: async () => {
//     set({ isUsersLoading: true });
//     try {
//       const res = await axiosInstance.get("/messages/contacts");
//       set({ allContacts: res.data });
//     } catch (error) {
//       toast.error(error.response?.data?.message);
//     } finally {
//       set({ isUsersLoading: false });
//     }
//   },

//   getMyChatPartners: async () => {
//     set({ isUsersLoading: true });
//     try {
//       const res = await axiosInstance.get("/messages/chats");
//       set({ chats: res.data });
//     } catch (error) {
//       toast.error(error.response?.data?.message);
//     } finally {
//       set({ isUsersLoading: false });
//     }
//   },

//   getMessagesByUserId: async (userId) => {
//     set({ isMessagesLoading: true });
//     try {
//       const res = await axiosInstance.get(`/messages/${userId}`);
//       set({ messages: res.data });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     } finally {
//       set({ isMessagesLoading: false });
//     }
//   },

//   // SEND MESSAGE
//   sendMessage: async (messageData) => {
//     const { selectedUser, messages } = get();
//     const { authUser } = useAuthStore.getState();

//     const tempId = `temp-${Date.now()}`;

//     const optimisticMessage = {
//       _id: tempId,
//       senderId: authUser._id,
//       receiverId: selectedUser._id,
//       text: messageData.text,
//       image: messageData.image,
//       audio: messageData.audio ? URL.createObjectURL(messageData.audio) : null,
//       createdAt: new Date().toISOString(),
//       isOptimistic: true,
//     };

//     set({ messages: [...messages, optimisticMessage] });

//     try {
//       let dataToSend;

//       if (messageData.audio) {
//         dataToSend = new FormData();

//         if (messageData.text) dataToSend.append("text", messageData.text);
//         if (messageData.image) dataToSend.append("image", messageData.image);
//         dataToSend.append("audio", messageData.audio);
//       } else {
//         dataToSend = messageData;
//       }

//       const res = await axiosInstance.post(
//         `/messages/send/${selectedUser._id}`,
//         dataToSend,
//         {
//           headers: messageData.audio
//             ? { "Content-Type": "multipart/form-data" }
//             : {},
//         }
//       );

//       set({
//         messages: get().messages.map((msg) =>
//           msg._id === tempId ? res.data : msg
//         ),
//       });

//     } catch (error) {
//       set({ messages: messages });
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   },

//   subscribeToMessages: () => {
//     const { selectedUser, isSoundEnabled } = get();
//     if (!selectedUser) return;

//     const socket = useAuthStore.getState().socket;

//     socket.on("newMessage", (newMessage) => {
//       const isMessageSentFromSelectedUser =
//         newMessage.senderId === selectedUser._id;

//       if (!isMessageSentFromSelectedUser) return;

//       const currentMessages = get().messages;
//       set({ messages: [...currentMessages, newMessage] });

//       if (isSoundEnabled) {
//         const notificationSound = new Audio("/sounds/notification.mp3");
//         notificationSound.currentTime = 0;
//         notificationSound.play().catch(() => {});
//       }
//     });
//   },

//   unsubscribeFromMessages: () => {
//     const socket = useAuthStore.getState().socket;
//     socket.off("newMessage");
//   },

//   // EDIT MESSAGE
//   editMessage: async (messageId, text) => {
//     try {
//       const res = await axiosInstance.put(`/messages/edit/${messageId}`, { text });

//       set((state) => ({
//         messages: state.messages.map((msg) =>
//           msg._id === messageId ? res.data : msg
//         ),
//       }));

//     } catch (error) {
//       console.log("Edit message error:", error);
//       toast.error("Failed to edit message");
//     }
//   },

//   // DELETE MESSAGE
//   deleteMessage: async (messageId) => {
//     try {
//       await axiosInstance.delete(`/messages/delete/${messageId}`);

//       set((state) => ({
//         messages: state.messages.filter((msg) => msg._id !== messageId),
//       }));

//     } catch (error) {
//       console.log("Delete message error:", error);
//       toast.error("Failed to delete message");
//     }
//   },

// }));



import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isTyping: false, // ✅ typing state

  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  // ✅ set typing
  setIsTyping: (value) => set({ isTyping: value }),

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // SEND MESSAGE
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      audio: messageData.audio ? URL.createObjectURL(messageData.audio) : null,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    set({ messages: [...messages, optimisticMessage] });

    try {
      let dataToSend;

      if (messageData.audio) {
        dataToSend = new FormData();

        if (messageData.text) dataToSend.append("text", messageData.text);
        if (messageData.image) dataToSend.append("image", messageData.image);
        dataToSend.append("audio", messageData.audio);
      } else {
        dataToSend = messageData;
      }

      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        dataToSend,
        {
          headers: messageData.audio
            ? { "Content-Type": "multipart/form-data" }
            : {},
        }
      );

      set({
        messages: get().messages.map((msg) =>
          msg._id === tempId ? res.data : msg
        ),
      });

    } catch (error) {
      set({ messages: messages });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    // ✅ new message
    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;

      if (!isMessageSentFromSelectedUser) return;

      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });

      if (isSoundEnabled) {
        const notificationSound = new Audio("/sounds/notification.mp3");
        notificationSound.currentTime = 0;
        notificationSound.play().catch(() => {});
      }
    });

    // ✅ typing indicator
    socket.on("typing", () => {
      set({ isTyping: true });
    });

    socket.on("stopTyping", () => {
      set({ isTyping: false });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
    socket.off("typing");
    socket.off("stopTyping");
  },

  // EDIT MESSAGE
  editMessage: async (messageId, text) => {
    try {
      const res = await axiosInstance.put(`/messages/edit/${messageId}`, { text });

      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === messageId ? res.data : msg
        ),
      }));

    } catch (error) {
      console.log("Edit message error:", error);
      toast.error("Failed to edit message");
    }
  },

  // DELETE MESSAGE
  deleteMessage: async (messageId) => {
    try {
      await axiosInstance.delete(`/messages/delete/${messageId}`);

      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== messageId),
      }));

    } catch (error) {
      console.log("Delete message error:", error);
      toast.error("Failed to delete message");
    }
  },

}));
