import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

type MessageProps = {
  uid: string;
  text: string;
  name: string;
  createdAt: any;
  id?: string;
  photoURL?: string;
};

const useFetchMessages = (params: string) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  useEffect(() => {
    const docRef = doc(db, "chats", params as string);

    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const messagesArray = data.messages || [];

        setMessages(messagesArray);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return messages;
};

export default useFetchMessages;
