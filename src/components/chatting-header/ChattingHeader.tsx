import Image from "next/image";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ChattingProfile from "../chatting-profile/ChattingProfile";
import { selectSelectedProfile } from "@/redux/slice/chattingSlice";

const ChattingHeader = () => {
  const router = useRouter();
  const selectedUser = useSelector(selectSelectedProfile);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("로그아웃에 성공했습니다.");
        router.push("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        toast.error(errorMessage);
      });
  };

  return (
    <header className="border-b-2 grid grid-cols-3">
      <section className="px-2 py-4 flex justify-between items-center border-r-2  border-gray-200">
        <h1 className="font-bold text-xl">채팅</h1>
        <button onClick={handleLogout} className=" text-gray-900">
          로그아웃
        </button>
      </section>

      <div className="px-2 py-4">
        <ChattingProfile name={selectedUser.name} selectable={false} />
      </div>
    </header>
  );
};

export default ChattingHeader;
