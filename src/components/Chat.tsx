import React, { useEffect, useState } from "react";
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

  return (
    <>
      {!isChatOpen && (
        <div
          className="fixed bottom-5 right-5 bg-blue-600 p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition z-1000"
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
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`my-2 p-3 rounded-lg ${
                  message.senderId === senderId
                    ? "bg-blue-300 ml-auto text-right"
                    : "bg-red-200 mr-auto text-left"
                } max-w-xs`}
              >
                <span className="font-bold">
                  {message.senderId === senderId ? "You" : message.senderName}:
                </span>
                {message.replyTo && (
                  <div className="bg-gray-200 p-2 rounded-lg text-sm mb-2">
                    <span className="font-bold">reply to: </span>
                    <p>
                      {messages.find((msg) => msg.id === message.replyTo)
                        ?.text || "deleted message"}
                    </p>
                  </div>
                )}
                <p className="text-sm">{message.text}</p>
                <span className="text-xs text-gray-500">
                  {formatTimestamp(message.timestamp)}
                </span>
                <button
                  className="text-xs bg-blue-500 mt-2 ml-2 rounded-[20%] p-1"
                  onClick={() => setReplyToMessage(message)}
                >
                  reply
                </button>
                {message.senderId === senderId && (
                  <button
                    className="text-xs bg-red-500 mt-2 ml-2 rounded-[20%] p-1"
                    onClick={() => deleteMessage(message.id)}
                  >
                    delete
                  </button>
                )}
              </div>
            ))}
          </div>

          {replyToMessage && (
            <div className="p-2 border-t bg-gray-200 text-sm">
              <span className="font-bold">
                reply to:{" "}
                {replyToMessage.senderId === senderId
                  ? "You"
                  : replyToMessage.senderName}
              </span>
              <p>{replyToMessage.text}</p>
              <button
                className="text-xs text-red-500"
                onClick={() => setReplyToMessage(null)}
              >
                cancel
              </button>
            </div>
          )}

          <div className="flex items-center border-t p-2 bg-white">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder=" type your message here"
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
