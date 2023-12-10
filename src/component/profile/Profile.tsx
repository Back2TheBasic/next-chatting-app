import Image from "next/image";
import styles from "./profile.module.scss";

interface ProfileCardProps {
  profileSrc: string;
  nickname: string;
}

const Profile = ({ profileSrc, nickname }: ProfileCardProps) => {
  return (
    <div className={styles.profile}>
      <Image
        className={styles.profile_image}
        width={24}
        height={24}
        src={profileSrc || "/profile_image_default.jpeg"}
        alt="profile-image"
      />
      <span>{nickname}</span>
    </div>
  );
};

export default Profile;
