"use client";
import React from "react";
import { User } from "@/types/user";
import Image from "next/image";
interface UserCardProps {
  photoURL: string;
  displayName: string;
}

const UserCard = ({ photoURL, displayName }: UserCardProps) => {
  return (
    <div>
      <div className="flex items-center space-x-4 p-2 m-4 border border-gray-200 hover:bg-gray-200 rounded cursor-pointer">
        <div className="w-8 h-8 rounded-full overflow-hidden m-2">
          <Image
            className="object-cover w-full h-full "
            src={photoURL}
            alt="프로필 이미지"
            width={500}
            height={500}
          />
        </div>
        <p className=" sm:inline-flex font-light text-black">{displayName}</p>
      </div>
    </div>
  );
};

export default UserCard;
