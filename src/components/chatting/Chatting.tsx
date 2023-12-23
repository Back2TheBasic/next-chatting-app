import { useSelector } from 'react-redux';
import ChattingMessage from '../chatting-message/ChattingMessage';
import ChattingSend from '../chatting-send/ChattingSend';
import { selectSelectedProfile } from '@/redux/slice/chattingSlice';
import useFetchDocuments from '@/hooks/useFetchDocuments';
import { IMessage } from '@/types/chatting';

const Chatting = () => {
  const { documents: messageList } = useFetchDocuments();
  const selectedUser = useSelector(selectSelectedProfile);

  const storeMessageList = messageList.filter(
    (message: IMessage) =>
      message.toUid === selectedUser.uid || message.fromUid === selectedUser.uid
  );

  return (
    <section className="px-2 py-4 h-full flex flex-col justify-between">
      <div className="row-span-5">
        <article>
          {storeMessageList?.map((message: IMessage) => (
            <ChattingMessage
              key={message.id}
              message={message}
              from={message.toUid === selectedUser.uid ? 'me' : 'others'}
            />
          ))}
        </article>
      </div>
      <ChattingSend />
    </section>
  );
};

export default Chatting;
