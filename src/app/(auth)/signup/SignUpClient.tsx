"use client";

import { useState } from "react";
import Link from "next/link";
import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import { toast } from "react-toastify";
import Input from "@/components/input/Input";
import { emailValidation } from "@/utils/validation";

const LoginClient = () => {
  const router = useRouter();

  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const changeSignUpInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signUpInfo.email || !signUpInfo.password) {
      toast.warning("이메일과 비밀번호를 모두 입력해주세요");
      return;
    }
    if (!signUpInfo.passwordConfirm) {
      toast.warning("비밀번호 확인을 완료해주세요");
      return;
    }
    if (!emailValidation(signUpInfo.email)) {
      toast.warning("이메일 형식에 맞게 입력해주세요");
      return;
    }
    if (signUpInfo.password !== signUpInfo.passwordConfirm) {
      toast.warning("비밀번호가 일치하지 않습니다");
      return;
    }

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, signUpInfo.email, signUpInfo.password)
      .then((userCredential) => {
        const user = userCredential.user;

        toast.success("회원가입에 성공했습니다.");
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

  return (
    <>
      {isLoading && <Loader />}

      <section className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <legend className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            회원가입
          </legend>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="mt-2">
              <Input
                id="email"
                type="email"
                label="이메일"
                placeholder="이메일을 입력하세요"
                onChange={changeSignUpInfo}
                autoComplete="email"
                required
              />
              {signUpInfo.email !== "" &&
                !emailValidation(signUpInfo.email) && (
                  <p className="block text-sm m-1 font-medium leading-6 text-red-500">
                    이메일 형식을 확인해주세요
                  </p>
                )}
            </div>

            <div className="mt-2">
              <Input
                id="password"
                type="password"
                label="비밀번호"
                placeholder="비밀번호를 입력하세요"
                onChange={changeSignUpInfo}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="mt-2">
              <Input
                id="passwordConfirm"
                type="password"
                label="비밀번호 확인"
                placeholder="비밀번호를 다시 입력하세요"
                onChange={changeSignUpInfo}
                autoComplete="current-password"
                required
              />

              {signUpInfo.passwordConfirm &&
                (signUpInfo.password === signUpInfo.passwordConfirm ? (
                  <p className="block text-sm m-1 font-medium leading-6 text-green-500">
                    비밀번호가 일치합니다
                  </p>
                ) : (
                  <p className="block text-sm m-1 font-medium leading-6 text-red-500">
                    비밀번호가 일치하지 않습니다
                  </p>
                ))}
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-pink px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lightPink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
            >
              회원가입
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            이미 회원이신가요?
            <Link
              href="/login"
              className="font-semibold leading-6 text-pink ml-1"
            >
              로그인
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default LoginClient;
