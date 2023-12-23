import React, { useState } from "react";
import { auth, db } from "@/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";

const MessageInput = () => {
  // 메시지 전송 로직을 여기에 추가합니다.
  const [message, setMessage] = useState("");
  const params = useParams();
  const sendMessage = async (event: any) => {
    event.preventDefault();
    console.log("message", message);

    const uid = auth?.currentUser?.uid || "";
    const displayName = auth?.currentUser?.displayName || "이름없음";

    await updateDoc(doc(db, "chats", params.id as string), {
      messages: arrayUnion({
        text: message,
        name: displayName,
        createdAt: Date.now(),
        uid,
        photoURL: auth?.currentUser?.photoURL,
      }),
    });
    setMessage("");
  };
  return (
    <form className="flex items-center p-4" onSubmit={sendMessage}>
      <input
        type="text"
        placeholder="메시지를 입력하세요."
        className="flex-grow p-2 border border-gray-300 rounded-lg m-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-black px-4 rounded-lg"
        type="submit"
      >
        전송
      </button>
    </form>
  );
};

export default MessageInput;
