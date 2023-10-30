"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import Loader from "@/components/loader/Loader";
import Input from "@/components/input/Input";

const LoginClient = () => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const changeLoginInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginInfo.email || !loginInfo.password) {
      toast.warning("이메일과 비밀번호를 모두 입력해주세요");
      return;
    }

    setIsLoading(true);

    signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
      .then((userCredential) => {
        toast.success("로그인에 성공했습니다.");
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("errorCode", errorCode, "errorMessage", errorMessage);
        toast.error(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleGoogleSignIn = () => {
    setIsLoading(true);

    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // TODO: 중복되는 함수 처리
        toast.success("로그인에 성공했습니다.");
        router.push("/");
      })
      .catch((error) => {
        // TODO: 함수 빼서 간단하게 처리
        // firebase에 오류 기록하는 기능이 있는데 추후 이걸 활용한다면 따로 함수 만들어서!!
        const errorCode = error.code;
        const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("errorCode", errorCode, "errorMessage", errorMessage);
        toast.error(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}

      <section className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <legend className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            로그인
          </legend>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="mt-2">
              <Input
                id="email"
                type="email"
                label="이메일"
                placeholder="이메일을 입력하세요"
                onChange={changeLoginInfo}
                autoComplete="email"
                required
              />
            </div>

            <div className="mt-2">
              <Input
                id="password"
                type="password"
                label="비밀번호"
                placeholder="비밀번호를 입력하세요"
                onChange={changeLoginInfo}
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-pink px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lightPink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
            >
              로그인
            </button>
          </form>

          <button
            className="flex w-full justify-center rounded-md bg-pink mt-2 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lightPink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
            onClick={handleGoogleSignIn}
          >
            Google 로그인
          </button>

          <p className="mt-10 text-center text-sm text-gray-500">
            아직 회원이 아니신가요?
            <Link
              href="/signup"
              className="font-semibold leading-6 text-pink ml-1"
            >
              회원가입
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default LoginClient;
