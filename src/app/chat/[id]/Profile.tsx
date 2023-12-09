import Image from "next/image";
import styles from "./chat.module.scss";

interface ProfileCardProps {
  profileSrc: string;
  nickname: string;
}

const Profile = ({ profileSrc, nickname }: ProfileCardProps) => {
  return (
    <div className={styles.profile}>
      <Image className={styles.profile_image} width={24} height={24} src={profileSrc} alt="profile-image" />
      <span>{nickname}</span>
    </div>
  );
};

export default Profile;
