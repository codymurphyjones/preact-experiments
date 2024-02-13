import MainContent from "./MainContent";
import ChatRooms from "./ChatRooms";
import OnlineUser from "./OnlineUsers";
import { useEffect } from "preact/hooks";
import { io } from "socket.io-client";
import { addMessage, messages } from "../messages";

export default function Page() {
  useEffect(() => {
    if (window) {
      window.addEventListener("load", () => {
        const socket = io();

        socket.on("chat message", (msg: string) => {
          const item = document.createElement("li");
          item.textContent = msg;
          addMessage("CJ", "mager", msg);
          window.scrollTo(0, document.body.scrollHeight);
        });
        const messageBox: HTMLInputElement | null = document.getElementById(
          "send-message"
        ) as HTMLInputElement;

        if (!messageBox) return;
        messageBox.addEventListener("keydown", function (event) {
          if (event && event.key === "Enter") {
            socket.emit("chat message", messageBox?.value);
            messageBox.value = "";
          }
        });
      });
    }
  }, []);
  return (
    <>
      <ChatRooms />
      <MainContent messages={messages.value} />
      <OnlineUser />
    </>
  );
}
