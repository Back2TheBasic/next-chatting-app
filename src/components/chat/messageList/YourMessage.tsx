import Image from "next/image";

const YourMessage = ({ content, photoURL }) => {
  const defaultImageUrl =
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtEMUl%2FbtrDc6957nj%2FNwJoDw0EOapJNDSNRNZK8K%2Fimg.jpg";
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-full overflow-hidden m-2">
        <Image
          className="object-cover w-full h-full"
          src={photoURL || defaultImageUrl}
          alt="프로필 이미지"
          width={500}
          height={500}
        />
      </div>
      <div className="bg-gray-300 max-w-xs rounded-lg p-2 text-gray-700">
        {content}
      </div>
    </div>
  );
};
export default YourMessage;
