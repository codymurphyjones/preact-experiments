import SendMessage from "./SendMessage";
import Message from "./Message";
// Initialize htm with Preact
type MessageDetail = {
  avatar: string;
  name: string;
  message: string;
};

export default function MainContent(props: { messages: MessageDetail[] }) {
  console.log("Repeat");
  console.log(props);
  return (
    <main className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-800">
      <header className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Room 1
        </h2>
        <button className="border border-gray-300 text-gray-900 rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">
          Leave Room
        </button>
      </header>
      <div id="messages-list" className="flex-1 overflow-y-auto p-4 space-y-4">
        {props.messages.map((item) => {
          return (
            <Message
              icon={item.avatar}
              username={item.name}
              message={item.message}
            />
          );
        })}
      </div>
      <SendMessage />
    </main>
  );
}
