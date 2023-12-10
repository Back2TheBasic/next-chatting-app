import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";

type MessageProps = {
  uid: string;
  text: string;
  name: string;
  createdAt: any;
  id?: string;
  photoURL?: string;
};

const useFetchMessages = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: MessageProps[] = [];
      QuerySnapshot.forEach((doc) => {
        const data = doc.data() as MessageProps;
        fetchedMessages.push({ ...data, id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return messages;
};

export default useFetchMessages;
