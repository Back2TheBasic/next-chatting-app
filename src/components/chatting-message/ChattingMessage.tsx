import { IMessage } from '@/types/chatting';
import Image from 'next/image';

interface IChattingMessageProps {
  from: string;
  message: IMessage;
}

const ChattingMessage = ({ from = 'me', message }: IChattingMessageProps) => {
  return (
    <div
      className={`flex items-center mb-2 ${
        from === 'me' ? 'justify-end' : 'justify-start'
      }`}
    >
      {from === 'me' ? null : (
        <Image
          src="https://lh3.googleusercontent.com/a/ACg8ocLc2b-K844TQMWych36ySy8e2VcKkWH8DbUP8AMB7lgsA=s576-c-no"
          alt="profile image"
          width={30}
          height={30}
          style={{ borderRadius: '50%' }}
        />
      )}

      <p className="bg-gray-200 rounded-md ml-2 px-3 py-2 ">{message?.text}</p>
    </div>
  );
};

export default ChattingMessage;
