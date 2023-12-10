"use client";

import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";

const NavigationEvents = () => {
  const router = useRouter();
  const pathname = usePathname();

  onAuthStateChanged(auth, (user) => {
    if (!user && pathname !== "/login" && pathname !== "/signup") {
      toast.warning("로그인 후 이용 가능합니다.");
      router.push("/login");
    } else {
    }
  });

  return null;
};

export default NavigationEvents;
