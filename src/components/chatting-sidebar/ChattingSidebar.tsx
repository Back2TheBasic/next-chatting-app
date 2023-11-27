import ChattingProfile from "../chatting-profile/ChattingProfile";
import { useDispatch } from "react-redux";
import {
  selectProfile,
  selectSelectedProfile,
} from "@/redux/slice/chattingSlice";
import { useEffect } from "react";

interface IUser {
  id: number;
  name: string;
}

const ChattingSidebar = () => {
  const dispatch = useDispatch();

  const users: IUser[] = [
    { id: 1, name: "소윤" },
    { id: 2, name: "소윤2" },
    { id: 3, name: "소윤3" },
  ];

  useEffect(() => {
    dispatch(selectProfile(users[0]));
  }, [dispatch]);

  const handleUserSelect = (targetUser: IUser) => {
    dispatch(selectProfile(targetUser));
  };

  return (
    <aside className="h-full px-2 py-4 border-r-2">
      {users.map((user) => {
        return (
          <ChattingProfile
            key={user.id}
            onClick={() => handleUserSelect(user)}
            name={user.name}
          />
        );
      })}
    </aside>
  );
};

export default ChattingSidebar;
