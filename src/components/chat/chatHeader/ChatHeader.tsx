import Image from "next/image";
import { useSelector } from "react-redux";
import {
  selectOtherUserLastActive,
  selectOtherUserName,
  selectOtherUserPhotoURL,
} from "@/redux/slice/authSlice";

const ChatHeader = () => {
  const userName = useSelector(selectOtherUserName);
  const photoURL = useSelector(selectOtherUserPhotoURL);
  const lastActive = useSelector(selectOtherUserLastActive);

  return (
    <div className="flex justify-start items-center p-3 border-b border-gray-200 ">
      <div className="w-8 h-8 rounded-full overflow-hidden m-2">
        <Image
          className="object-cover w-full h-full "
          src={photoURL || "/images/default_profile.png"}
          alt="프로필 이미지"
          width={500}
          height={500}
        />
      </div>
      <div className="ml-4">
        <h2 className="text-lg font-semibold text-black">{userName}</h2>
        <p className="text-sm text-gray-500">{lastActive}</p>
      </div>
    </div>
  );
};

export default ChatHeader;
