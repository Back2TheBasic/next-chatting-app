"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import Chatting from "@/components/chatting/Chatting";

const ChattingClient = () => {
  return (
    <div className="w-full min-h-screen grid grid-cols-3">
      <section>
        <Sidebar />
      </section>
      <section className="col-span-2">
        <Chatting />
      </section>
    </div>
  );
};

export default ChattingClient;
