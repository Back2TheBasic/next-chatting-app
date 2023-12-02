import ChattingProfile from "../chatting-profile/ChattingProfile";
import { useDispatch } from "react-redux";
import { selectProfile } from "@/redux/slice/chattingSlice";
import { useEffect } from "react";
import { auth } from "@/firebase/firebase";

interface IUser {
  uid: string;
  name: string;
}

const ChattingSidebar = () => {
  const dispatch = useDispatch();
  const users: IUser[] = [
    { uid: "bfQKgX23yeesIE5YMw2U9D6cdaI2", name: "test" },
    { uid: "szHPjUb87cfy34otYhaX8hGBBJg2", name: "test1" },
    { uid: "6MP4Poawb9UDALVpFmRA2FrSRoU2", name: "sytkfkd96" },
    { uid: "9OMuqLUkRENmBkpaPtrqcgIJoWp2", name: "test4" },
  ].filter((user) => user.uid !== auth?.currentUser?.uid);

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
            key={user.uid}
            onClick={() => handleUserSelect(user)}
            name={user.name}
          />
        );
      })}
    </aside>
  );
};

export default ChattingSidebar;
