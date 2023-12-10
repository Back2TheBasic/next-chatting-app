import { db } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

const useFetchDocuments = () => {
  const [documents, setDocuments] = useState([]);

  const getDocuments = useCallback(async () => {
    const docRef = collection(db, "messages");
    const q = query(docRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (snapshot) => {
      const allData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDocuments(allData);
    });
  }, []);

  useEffect(() => {
    getDocuments();
  }, [getDocuments]);

  return { documents };
};

export default useFetchDocuments;
