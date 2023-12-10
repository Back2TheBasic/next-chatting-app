"use client";

import ChattingSidebar from "@/components/chatting-sidebar/ChattingSidebar";
import Chatting from "@/components/chatting/Chatting";
import ChattingHeader from "@/components/chatting-header/ChattingHeader";

const ChattingClient = () => {
  return (
    <>
      <ChattingHeader />

      <div className="w-full min-h-screen grid grid-cols-3">
        <ChattingSidebar />
        <section className="col-span-2">
          <Chatting />
        </section>
      </div>
    </>
  );
};

export default ChattingClient;
