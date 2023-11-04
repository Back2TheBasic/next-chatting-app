import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Sidebar = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);

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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <aside>
      <button onClick={handleLogout} className=" text-gray-900">
        로그아웃
      </button>
    </aside>
  );
};

export default Sidebar;
