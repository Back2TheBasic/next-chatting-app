import { auth, db } from "@/firebase/firebase";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import Input from "../input/Input";
import { useSelector } from "react-redux";
import { selectSelectedProfile } from "@/redux/slice/chattingSlice";
import { toast } from "react-toastify";

const ChattingSend = () => {
  const [message, setMessage] = useState("");
  const changeChattingMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const selectedUser = useSelector(selectSelectedProfile);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (message.length <= 0) {
      toast.warn("메시지를 먼저 입력해주세요");
      return;
    }

    await setDoc(doc(collection(db, "messages")), {
      text: message,
      createdAt: Timestamp.now().toDate(),
      name: selectedUser.name,
      userId: selectedUser.id,
    });
  };

  return (
    <form className="flex" onSubmit={handleSendMessage}>
      <Input
        id="chatting"
        placeholder="메시지를 입력하세요"
        onChange={changeChattingMessage}
      />
      <button type="submit" className="w-12">
        전송
      </button>
    </form>
  );
};

export default ChattingSend;
