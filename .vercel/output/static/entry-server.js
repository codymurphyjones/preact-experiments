import renderToString from "preact-render-to-string";
import { signal } from "@preact/signals";
import { jsx, jsxs, Fragment } from "preact/jsx-runtime";
import { useEffect } from "preact/hooks";
import { io } from "socket.io-client";
function SendMessage() {
  return jsx("div", {
    className: "p-4 border-t",
    "data-id": "31",
    children: jsx("input", {
      id: "send-message",
      className: "flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full",
      placeholder: "Type a message…",
      "data-id": "32"
    })
  });
}
function Message(props) {
  const icon = props.icon || "JP";
  const username = props.username || "jaredpalmer";
  const message = props.message || "Hello, World!";
  return jsxs("div", {
    class: "flex items-center space-x-4",
    children: [jsx("span", {
      class: "relative flex shrink-0 overflow-hidden rounded-full h-9 w-9",
      "data-id": "38",
      children: jsx("span", {
        class: "bg-red-800 flex h-full w-full items-center justify-center rounded-full bg-muted",
        "data-id": "40",
        children: icon
      })
    }), jsxs("div", {
      children: [jsxs("h4", {
        class: "text-sm font-semibold",
        children: ["@", username]
      }), jsx("p", {
        class: "text-sm text-gray-500 dark:text-gray-400",
        children: message
      })]
    })]
  });
}
function MainContent(props) {
  console.log("Repeat");
  console.log(props);
  return jsxs("main", {
    className: "flex-1 flex flex-col bg-gray-50 dark:bg-gray-800",
    children: [jsxs("header", {
      className: "flex items-center justify-between p-4 border-b",
      children: [jsx("h2", {
        className: "text-lg font-semibold text-gray-900 dark:text-gray-100",
        children: "Room 1"
      }), jsx("button", {
        className: "border border-gray-300 text-gray-900 rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline",
        children: "Leave Room"
      })]
    }), jsx("div", {
      id: "messages-list",
      className: "flex-1 overflow-y-auto p-4 space-y-4",
      children: props.messages.map((item) => {
        return jsx(Message, {
          icon: item.avatar,
          username: item.name,
          message: item.message
        });
      })
    }), jsx(SendMessage, {})]
  });
}
function ChatRooms() {
  return jsx("aside", {
    className: "w-64 bg-white dark:bg-gray-800 overflow-y-auto",
    children: jsxs("div", {
      className: "p-4",
      children: [jsx("h2", {
        className: "text-lg font-semibold text-gray-900 dark:text-gray-100",
        children: "Chat Rooms"
      }), jsxs("div", {
        className: "mt-4 space-y-4",
        children: [jsx("a", {
          href: "#",
          className: "block p-3 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600",
          children: jsx("h3", {
            className: "text-sm font-semibold text-gray-900 dark:text-gray-100",
            children: "Room 1"
          })
        }), jsx("a", {
          href: "#",
          className: "block p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700",
          children: jsx("h3", {
            className: "text-sm font-semibold text-gray-900 dark:text-gray-100",
            children: "Room 2"
          })
        }), jsx("a", {
          href: "#",
          className: "block p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700",
          children: jsx("h3", {
            className: "text-sm font-semibold text-gray-900 dark:text-gray-100",
            children: "Room 3"
          })
        })]
      })]
    })
  });
}
function OnlineUsers() {
  return jsx("aside", {
    className: "w-64 bg-white dark:bg-gray-800 overflow-y-auto",
    children: jsxs("div", {
      className: "p-4",
      children: [jsx("h2", {
        className: "text-lg font-semibold text-gray-900 dark:text-gray-100",
        children: "Online Users"
      }), jsx("div", {
        className: "mt-4 space-y-4"
      })]
    })
  });
}
function createMessage(avatar, name, message) {
  return {
    avatar,
    name,
    message
  };
}
const messages = signal([createMessage("JP", "jpmorgan@gmail.com", "LETS GOOOOO TODAY IS THE DAY")]);
const addMessage = (avatar, user, message) => {
  messages.value = [...messages.value, {
    avatar,
    name: user,
    message
  }];
};
function Page() {
  useEffect(() => {
    if (window) {
      window.addEventListener("load", () => {
        const socket = io();
        socket.on("chat message", (msg) => {
          const item = document.createElement("li");
          item.textContent = msg;
          addMessage("CJ", "mager", msg);
          window.scrollTo(0, document.body.scrollHeight);
        });
        const messageBox = document.getElementById("send-message");
        if (!messageBox)
          return;
        messageBox.addEventListener("keydown", function(event) {
          if (event && event.key === "Enter") {
            socket.emit("chat message", messageBox == null ? void 0 : messageBox.value);
            messageBox.value = "";
          }
        });
      });
    }
  }, []);
  return jsxs(Fragment, {
    children: [jsx(ChatRooms, {}), jsx(MainContent, {
      messages: messages.value
    }), jsx(OnlineUsers, {})]
  });
}
signal(0);
function App() {
  return jsx(Page, {});
}
function render() {
  const html = renderToString(jsx(App, {}));
  return {
    html
  };
}
export {
  render
};
