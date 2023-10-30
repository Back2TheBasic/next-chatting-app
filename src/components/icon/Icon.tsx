import Image from "next/image";

import hideIcon from "./icons/shape=hide.svg";
import showIcon from "./icons/shape=show.svg";

const Icon = ({ type = "", alt = "" }) => {
  let src = "";
  switch (type) {
    case "hide":
      src = hideIcon;
      break;
    case "show":
      src = showIcon;
      break;
    default:
      throw new Error("지원하는 아이콘이 아닙니다");
  }

  return <Image src={src} alt={alt} height={40} />;
};

export default Icon;
