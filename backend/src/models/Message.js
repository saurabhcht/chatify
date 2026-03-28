// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema(
//   {
//     senderId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     receiverId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     text: {
//       type: String,
//       trim: true,
//       maxlength: 2000,
//     },
//     image: {
//       type: String,
//     },
//     audio: {
//       type: String,
//     },
//     edited: {
//   type: Boolean,
//   default: false
// }
//   },
//   { timestamps: true }
// );

// const Message = mongoose.model("Message", messageSchema);

// export default Message;

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
{
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  text: {
    type: String,
    trim: true,
    maxlength: 2000,
  },

  image: {
    type: String,
  },

  audio: {
    type: String,
  },

  edited: {
    type: Boolean,
    default: false,
  },

  seen: {              // ✅ THIS CONTROLS THE TICKS
    type: Boolean,
    default: false,
  }

},
{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;