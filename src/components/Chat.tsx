import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useAppSelector } from "../hooks/reduxHooks";
import { getUserNameById } from "../services/userServices";
import { FiMessageCircle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date | { seconds: number; nanoseconds: number };
  replyTo?: string | null;
  senderName?: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [replyToMessage, setReplyToMessage] = useState<Message | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const userInfo = useAppSelector((state) => state.user.user);
  const senderId = userInfo.id;

  const scrollRef = useRef<HTMLDivElement>(null); // Use ref for scrolling

  useEffect(() => {
    if (isChatOpen) {
      const q = query(
        collection(db, `classChats/${userInfo.class_id}/messages`),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const msgList = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const messageData = { id: doc.id, ...doc.data() } as Message;
            const senderName = await getUserNameById(messageData.senderId);
            return { ...messageData, senderName };
          })
        );
        setMessages(msgList);

        // Scroll to the last message after messages are loaded
        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
      });

      return () => unsubscribe();
    }
  }, [userInfo.class_id, isChatOpen]);

  const sendMessage = async () => {
    if (text.trim()) {
      await addDoc(collection(db, `classChats/${userInfo.class_id}/messages`), {
        senderId: userInfo.id,
        text,
        timestamp: new Date(),
        replyTo: replyToMessage ? replyToMessage.id : null,
      });
      setText("");
      setReplyToMessage(null);

      // Scroll to the last message after sending a new one
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const deleteMessage = async (id: string) => {
    await deleteDoc(doc(db, `classChats/${userInfo.class_id}/messages`, id));
  };

  const formatTimestamp = (timestamp) => {
    const date =
      timestamp instanceof Date
        ? timestamp
        : new Date(timestamp.seconds * 1000);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (
    !userInfo.id ||
    !(userInfo.role == "student" || userInfo.role == "teacher")
  ) {
    return null;
  }

  return (
    <>
      {!isChatOpen && (
        <div
          className="fixed bottom-5 right-5 bg-[#002749] p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition z-1000"
          onClick={() => setIsChatOpen(true)}
        >
          <FiMessageCircle className="text-white text-2xl" />
        </div>
      )}

      {isChatOpen && (
        <div className="fixed bottom-5 right-5 bg-white rounded-lg shadow-lg w-80 h-96 flex flex-col z-10">
          {/* Chat header */}
          <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-lg">
            <h2 className="text-lg">Chat</h2>
            <IoClose
              className="cursor-pointer text-2xl"
              onClick={() => setIsChatOpen(false)}
            />
          </div>

          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100 flex flex-col">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`my-2 p-3 rounded-lg max-w-max inline-block ${
                  message.senderId === senderId
                    ? "bg-blue-300 text-right"
                    : "bg-red-200 text-left"
                }`}
                style={{
                  alignSelf:
                    message.senderId === senderId ? "flex-end" : "flex-start",
                }}
              >
                {/* Show sender's name only for other users' messages */}
                {message.senderId !== senderId && (
                  <span className="font-bold">{message.senderName}</span>
                )}

                {/* Display reply message if it exists */}
                {message.replyTo && (
                  <div className="bg-gray-200 p-2 rounded-lg text-sm mb-2">
                    <span className="font-bold">Reply to: </span>
                    <p>
                      {messages.find((msg) => msg.id === message.replyTo)
                        ?.text || "deleted message"}
                    </p>
                  </div>
                )}

                {/* Message text */}
                <p className="text-sm">{message.text}</p>

                {/* Timestamp */}
                <span className="text-xs text-gray-500">
                  {formatTimestamp(message.timestamp)}
                </span>

                {/* Reply and delete buttons */}
                <div className="mt-2">
                  <button
                    className="text-xs bg-blue-500 mt-1 ml-2 rounded-full p-1"
                    onClick={() => setReplyToMessage(message)}
                  >
                    Reply
                  </button>
                  {message.senderId === senderId && (
                    <button
                      className="text-xs bg-red-500 mt-1 ml-2 rounded-full p-1"
                      onClick={() => deleteMessage(message.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div ref={scrollRef}></div>
          </div>

          {replyToMessage && (
            <div className="p-2 border-t bg-gray-200 text-sm">
              <span className="font-bold">
                Reply to:{" "}
                {replyToMessage.senderId === senderId
                  ? "You"
                  : replyToMessage.senderName}
              </span>
              <p>{replyToMessage.text}</p>
              <button
                className="text-xs text-red-500"
                onClick={() => setReplyToMessage(null)}
              >
                Cancel
              </button>
            </div>
          )}

          <div className="flex items-center border-t p-2 bg-white">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here"
              className="flex-1 border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              className="bg-blue-500 text-white rounded-lg px-4"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
