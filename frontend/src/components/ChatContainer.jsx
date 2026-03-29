// import { useEffect, useRef } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import { useChatStore } from "../store/useChatStore";
// import ChatHeader from "./ChatHeader";
// import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
// import MessageInput from "./MessageInput";
// import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
// import AudioMessage from "./AudioMessage";
// function ChatContainer() {
//   const {
//     selectedUser,
//     getMessagesByUserId,
//     messages,
//     isMessagesLoading,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   } = useChatStore();
//   const { authUser } = useAuthStore();
//   const messageEndRef = useRef(null);

//   useEffect(() => {
//     getMessagesByUserId(selectedUser._id);
//     subscribeToMessages();

//     // clean up
//     return () => unsubscribeFromMessages();
//   }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

//   useEffect(() => {
//     if (messageEndRef.current) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   return (
//     <>
//       <ChatHeader />
//       <div className="flex-1 px-6 overflow-y-auto py-8">
//         {messages.length > 0 && !isMessagesLoading ? (
//           <div className="max-w-3xl mx-auto space-y-6">
//             {messages.map((msg) => (
//               <div
//                 key={msg._id}
//                 className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
//               >
//                 <div
//                   className={`chat-bubble relative ${
//                     msg.senderId === authUser._id
//                       ? "bg-cyan-600 text-white"
//                       : "bg-slate-800 text-slate-200"
//                   }`}
//                 >
//                   {/* {msg.image && (
//                     <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover" />
//                   )}
//                   {msg.text && <p className="mt-2">{msg.text}</p>} */}

//                   {msg.image && (
//   <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover" />
// )}

// {msg.text && <p className="mt-2">{msg.text}</p>}

// {/* 🎤 AUDIO MESSAGE */}
// {msg.audio && <AudioMessage audio={msg.audio} />}
//                   <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
//                     {new Date(msg.createdAt).toLocaleTimeString(undefined, {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </p>
//                 </div>
//               </div>
//             ))}
//             {/* 👇 scroll target */}
//             <div ref={messageEndRef} />
//           </div>
//         ) : isMessagesLoading ? (
//           <MessagesLoadingSkeleton />
//         ) : (
//           <NoChatHistoryPlaceholder name={selectedUser.fullName} />
//         )}
//       </div>

//       <MessageInput />
//     </>
//   );
// }

// export default ChatContainer;




// import { useEffect, useRef } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import { useChatStore } from "../store/useChatStore";
// import ChatHeader from "./ChatHeader";
// import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
// import MessageInput from "./MessageInput";
// import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
// import AudioMessage from "./AudioMessage";

// function ChatContainer() {
//   const {
//     selectedUser,
//     getMessagesByUserId,
//     messages,
//     isMessagesLoading,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//     deleteMessage,
//     editMessage,
//   } = useChatStore();

//   const { authUser } = useAuthStore();
//   const messageEndRef = useRef(null);

//   useEffect(() => {
//     if (!selectedUser) return;

//     getMessagesByUserId(selectedUser._id);
//     subscribeToMessages();

//     return () => unsubscribeFromMessages();
//   }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ✏️ EDIT MESSAGE
//   const handleEdit = async (msg) => {
//     const newText = prompt("Edit your message", msg.text);

//     if (!newText || newText.trim() === msg.text) return;

//     try {
//       await editMessage(msg._id, newText);
//     } catch (error) {
//       console.log("Edit error:", error);
//     }
//   };

//   // 🗑 DELETE MESSAGE
//   const handleDelete = async (messageId) => {
//     try {
//       await deleteMessage(messageId);
//     } catch (error) {
//       console.log("Delete error:", error);
//     }
//   };

//   return (
//     <>
//       <ChatHeader />

//       <div className="flex-1 px-6 overflow-y-auto py-8">
//         {messages.length > 0 && !isMessagesLoading ? (
//           <div className="max-w-3xl mx-auto space-y-6">
//             {messages.map((msg) => (
//               <div
//                 key={msg._id}
//                 className={`chat ${
//                   msg.senderId === authUser._id ? "chat-end" : "chat-start"
//                 }`}
//               >
//                 <div
//                   className={`chat-bubble relative ${
//                     msg.senderId === authUser._id
//                       ? "bg-cyan-600 text-white"
//                       : "bg-slate-800 text-slate-200"
//                   }`}
//                 >
//                   {/* IMAGE */}
//                   {msg.image && (
//                     <img
//                       src={msg.image}
//                       alt="Shared"
//                       className="rounded-lg h-48 object-cover"
//                     />
//                   )}

//                   {/* TEXT */}
//                   {msg.text && <p className="mt-2">{msg.text}</p>}

//                   {/* AUDIO */}
//                   {msg.audio && <AudioMessage audio={msg.audio} />}

//                   {/* EDIT / DELETE (ONLY YOUR MESSAGE) */}
//                   {msg.senderId === authUser._id && (
//                     <div className="flex gap-3 text-xs mt-2">
//                       <button
//                         onClick={() => handleEdit(msg)}
//                         className="text-yellow-300 hover:underline"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() => handleDelete(msg._id)}
//                         className="text-red-400 hover:underline"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   )}

//                   {/* TIME */}
//                   <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
//                     {new Date(msg.createdAt).toLocaleTimeString(undefined, {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </p>
//                 </div>
//               </div>
//             ))}

//             <div ref={messageEndRef} />
//           </div>
//         ) : isMessagesLoading ? (
//           <MessagesLoadingSkeleton />
//         ) : (
//           <NoChatHistoryPlaceholder name={selectedUser?.fullName} />
//         )}
//       </div>

//       <MessageInput />
//     </>
//   );
// }

// export default ChatContainer;



import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import AudioMessage from "./AudioMessage";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
    deleteMessage,
    editMessage,
    isTyping,
    setIsTyping,
  } = useChatStore();

  const { authUser, socket } = useAuthStore();
  const messageEndRef = useRef(null);

  // useEffect(() => {
  //   if (!selectedUser) return;

  //   getMessagesByUserId(selectedUser._id);
  //   subscribeToMessages();

  //   return () => unsubscribeFromMessages();
  // }, [selectedUser]);


  useEffect(() => {
  if (!selectedUser) return;

  getMessagesByUserId(selectedUser._id);
  subscribeToMessages();

  // MARK MESSAGES AS SEEN
  if (socket) {
    socket.emit("messageSeen", {
      senderId: selectedUser._id,
    });
  }

  return () => unsubscribeFromMessages();
}, [selectedUser]);



  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


useEffect(() => {
  if (!selectedUser || !socket) return;

  socket.emit("messageSeen", {
    senderId: selectedUser._id,
  });

}, [messages]);

  // 👇 LISTEN FOR TYPING EVENTS
  useEffect(() => {
    if (!socket) return;

    socket.on("typing", () => {
      setIsTyping(true);
    });

    socket.on("messagesSeen", () => {
  useChatStore.setState((state) => ({
    messages: state.messages.map((msg) => ({
      ...msg,
      seen: true,
    })),
  }));
});


    socket.on("stopTyping", () => {
      setIsTyping(false);
    });

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("messagesSeen");
    };
  }, [socket]);

  // ✏️ EDIT MESSAGE
  const handleEdit = async (msg) => {
    const newText = prompt("Edit your message", msg.text);

    if (!newText || newText.trim() === msg.text) return;

    try {
      await editMessage(msg._id, newText);
    } catch (error) {
      console.log("Edit error:", error);
    }
  };

  // 🗑 DELETE MESSAGE
  const handleDelete = async (messageId) => {
    try {
      await deleteMessage(messageId);
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <>
      <ChatHeader />

      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">

            {messages.map((msg) => (
              
              <div
                key={msg._id}
                className={`chat ${
                  msg.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {/* IMAGE */}
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="rounded-lg h-48 object-cover"
                    />
                  )}

                  {/* TEXT */}
                  {msg.text && <p className="mt-2">{msg.text}</p>}

                  {/* AUDIO */}
                  {/* {msg.audio && <AudioMessage audio={msg.audio} />} */}
                  {msg.audio && msg.audio.startsWith("http") && (
  <AudioMessage audio={msg.audio} />
)}


                  {/* EDIT / DELETE */}
                  {msg.senderId === authUser._id && (
                    <div className="flex gap-3 text-xs mt-2">
                      <button
                        onClick={() => handleEdit(msg)}
                        className="text-yellow-300 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  {/* TIME */}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}

                    {/* MESSAGE TICK */}
                    {msg.senderId === authUser._id && (
                     <span className={msg.seen ? "text-blue-400 ml-1" : "ml-1"}>
                      {msg.seen ? "✔✔" : "✔"}
                      </span>
                         )}

                  </p>
                </div>
              </div>
            ))}

            {/* 👇 TYPING INDICATOR */}
            {isTyping && (
              <div className="text-sm text-gray-400 italic">
                {selectedUser?.fullName} is typing...
              </div>
            )}

            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser?.fullName} />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;