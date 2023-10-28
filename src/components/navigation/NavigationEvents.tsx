"use client";

import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/firebase/firebase";
import { toast } from "react-toastify";

const NavigationEvents = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentUser = auth.currentUser;

  if (pathname !== "/login" && pathname !== "/signup" && !currentUser) {
    toast.warning("로그인 후 이용 가능합니다.");
    router.push("/login");
  }

  return null;
};

export default NavigationEvents;
