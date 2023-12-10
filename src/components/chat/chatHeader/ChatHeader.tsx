import Image from "next/image";

const ChatHeader = () => {
  return (
    <div className="flex justify-start items-center p-3 border-b border-gray-200 ">
      <div className="w-8 h-8 rounded-full overflow-hidden m-2">
        <Image
          className="object-cover w-full h-full "
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtEMUl%2FbtrDc6957nj%2FNwJoDw0EOapJNDSNRNZK8K%2Fimg.jpg"
          alt="프로필 이미지"
          width={500}
          height={500}
        />
      </div>
      <div className="ml-4">
        <h2 className="text-lg font-semibold text-black">채팅 상대방 이름</h2>
        <p className="text-sm text-gray-500">마지막 활동 시간</p>
      </div>
    </div>
  );
};

export default ChatHeader;
