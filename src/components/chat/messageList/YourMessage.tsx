const YourMessage = ({ content, photoURL }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-full overflow-hidden m-2">
        <img
          className="object-cover w-full h-full"
          src={photoURL}
          alt="프로필 이미지"
        />
      </div>
      <div className="bg-gray-300 max-w-xs rounded-lg p-2 text-gray-700">
        {content}
      </div>
    </div>
  );
};
export default YourMessage;
