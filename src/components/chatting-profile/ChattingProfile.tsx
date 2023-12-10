import Image from "next/image";

interface IProfile {
  selectable?: boolean;
  name: string;
  onClick?: () => void;
}

const ChattingProfile = ({
  selectable = true,
  name,
  onClick = () => {},
}: IProfile) => {
  return (
    <section
      className={`flex items-center ${
        selectable
          ? "p-2 mb-2 rounded-md border hover:bg-gray-200 hover:cursor-pointer"
          : "font-bold"
      }`}
      onClick={onClick}
    >
      <Image
        src="https://lh3.googleusercontent.com/a/ACg8ocLc2b-K844TQMWych36ySy8e2VcKkWH8DbUP8AMB7lgsA=s576-c-no"
        alt="profile image"
        width={40}
        height={40}
        style={{ borderRadius: "50%" }}
      />
      <p className="ml-2">{name}</p>
    </section>
  );
};

export default ChattingProfile;
