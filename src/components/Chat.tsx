
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useAppSelector } from "../hooks/reduxHooks";
import { getUserNameById } from "../services/userServices";
import { getLevelNameById } from "../services/levelsServices";
import { FiMessageCircle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date | { seconds: number; nanoseconds: number };
  replyTo?: string | null;
  senderName?: string;
}

interface Level {
  id: string;
  name: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [replyToMessage, setReplyToMessage] = useState<Message | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeClassId, setActiveClassId] = useState<string | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const userInfo = useAppSelector((state) => state.user.user);
  const senderId = userInfo.id;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const q = query(
          collection(db, "teachers"),
          where("teacherId", "==", userInfo.id)
        );
        const unsubscribe = onSnapshot(q, async () => {
          const levelIds = userInfo?.levels_Ids || [];
          const levelsData = await Promise.all(
            levelIds.map(async (levelId) => {
              const levelName = await getLevelNameById(levelId);
              return { id: levelId, name: levelName };
            })
          );
          setLevels(levelsData);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching levels:", error);
      }
    };

    if (userInfo) fetchLevels();
  }, [userInfo]);

  useEffect(() => {
    if (isChatOpen && activeClassId) {
      const q = query(
        collection(db, `classChats/${activeClassId}/messages`),
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

        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
      });

      return () => unsubscribe();
    }
  }, [activeClassId, isChatOpen]);

  const sendMessage = async () => {
    if (text.trim() && activeClassId) {
      await addDoc(collection(db, `classChats/${activeClassId}/messages`), {
        senderId: userInfo.id,
        text,
        timestamp: new Date(),
        replyTo: replyToMessage ? replyToMessage.id : null,
      });
      setText("");
      setReplyToMessage(null); // Reset reply after sending

      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const deleteMessage = async (id: string) => {
    await deleteDoc(doc(db, `classChats/${activeClassId}/messages`, id));
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

  const openChatForClass = (classId: string) => {
    setIsChatOpen(true);
    setActiveClassId(classId);
  };

  return (
    <>
      {userInfo.role === "teacher" && !isChatOpen && (
        <div className="fixed bottom-5 right-5 space-y-3 z-50">
          {levels && levels.length > 0 ? (
            levels.map((level) => (
              <div
                key={level.id}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => openChatForClass(level.id)}
              >
                <div className="bg-[#002749] p-4 rounded-full shadow-lg hover:bg-blue-700 transition">
                  <FiMessageCircle className="text-white text-2xl" />
                </div>
                <span className="text-[#002749]">{level.name}</span>
              </div>
            ))
          ) : (
            <p>No levels found</p>
          )}
        </div>
      )}

      {userInfo.role === "student" && !isChatOpen && (
        <div
          className="fixed bottom-5 right-5 bg-[#002749] p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition"
          onClick={() => openChatForClass(userInfo.class_id)}
        >
          <FiMessageCircle className="text-white text-2xl" />
        </div>
      )}

      {isChatOpen && (
        <div className="fixed bottom-5 right-5 bg-white rounded-lg shadow-lg w-80 h-96 flex flex-col z-10">
          <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-lg">
            <h2 className="text-lg">Chat</h2>
            <IoClose
              className="cursor-pointer text-2xl"
              onClick={() => setIsChatOpen(false)}
            />
          </div>

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

                {/* Displaying the original message being replied to */}
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
            <div ref={scrollRef} />
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

          <div className="flex p-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 border p-2 rounded-lg"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white rounded-lg px-4 py-2 ml-2"
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
