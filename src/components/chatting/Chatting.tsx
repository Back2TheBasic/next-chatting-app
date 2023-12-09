import { useSelector } from 'react-redux';
import ChattingMessage from '../chatting-message/ChattingMessage';
import ChattingSend from '../chatting-send/ChattingSend';
import { selectSelectedProfile } from '@/redux/slice/chattingSlice';
import useFetchDocuments from '@/hooks/useFetchDocuments';

const Chatting = () => {
  const { documents: chattingList } = useFetchDocuments();
  const selectedUser = useSelector(selectSelectedProfile);

  const storeChattingList = chattingList?.filter(
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
              from={chatting.toUid === selectedUser.uid ? 'me' : 'others'}
            />
          ))}
        </article>
      </div>
      <ChattingSend />
    </section>
  );
};

export default Chatting;
