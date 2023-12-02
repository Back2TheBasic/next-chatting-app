import { useDispatch, useSelector } from "react-redux";
import ChattingMessage from "../chatting-message/ChattingMessage";
import ChattingSend from "../chatting-send/ChattingSend";
import {
  getChattingList,
  selectChattingList,
  selectSelectedProfile,
} from "@/redux/slice/chattingSlice";
import useFetchDocuments from "@/hooks/useFetchDocuments";
import { useEffect } from "react";

const Chatting = () => {
  const dispatch = useDispatch();

  const { documents: chattingList } = useFetchDocuments();
  const selectedUser = useSelector(selectSelectedProfile);

  useEffect(() => {
    dispatch(getChattingList(chattingList));
  }, [chattingList, dispatch]);

  const storeChattingList = useSelector(selectChattingList)?.filter(
    (chatting) =>
      chatting.toUid === selectedUser.uid ||
      chatting.fromUid === selectedUser.uid
  );

  return (
    <section className="px-2 py-4 h-full grid grid-rows-6">
      <div className="row-span-5">
        <article>
          {storeChattingList?.map((chatting) => (
            <ChattingMessage
              key={chatting.id}
              chatting={chatting}
              from={chatting.toUid === selectedUser.uid ? "me" : "others"}
            />
          ))}
        </article>
      </div>
      <ChattingSend />
    </section>
  );
};

export default Chatting;
