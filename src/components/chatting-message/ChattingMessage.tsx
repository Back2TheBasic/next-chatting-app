import Image from "next/image";

const ChattingMessage = ({ from = "me", chatting }) => {
  return (
    <div
      className={`flex items-center ${
        from === "me" ? "justify-end" : "justify-start"
      }`}
    >
      <Image
        src="https://lh3.googleusercontent.com/a/ACg8ocLc2b-K844TQMWych36ySy8e2VcKkWH8DbUP8AMB7lgsA=s576-c-no"
        alt="profile image"
        width={30}
        height={30}
        style={{ borderRadius: "50%" }}
      />
      <p className="bg-gray-200 rounded-md ml-2 px-3 py-2 ">{chatting?.text}</p>
    </div>
  );
};

export default ChattingMessage;
