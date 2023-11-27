import Image from "next/image";
import { useEffect } from "react";
import ChattingMessage from "../chatting-message/ChattingMessage";
import ChattingSend from "../chatting-send/ChattingSend";

const Chatting = () => {
  useEffect(() => {
    console.log("네네");
  }, []);

  return (
    <section className="px-2 py-4 h-full grid grid-rows-6">
      <div className="row-span-5">
        <article>
          <ChattingMessage />
          <ChattingMessage from="others" />
        </article>
      </div>
      <ChattingSend />
    </section>
  );
};

export default Chatting;
