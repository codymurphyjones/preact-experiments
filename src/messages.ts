import { signal as sig } from "@preact/signals";

function createMessage(avatar: string, name: string, message: string) {
  return {
    avatar,
    name,
    message,
  };
}

export const messages = sig([
  createMessage("JP", "jpmorgan@gmail.com", "LETS GOOOOO TODAY IS THE DAY"),
]);

export const addMessage = (avatar: string, user: string, message: string) => {
  messages.value = [
    ...messages.value,
    { avatar: avatar, name: user, message: message },
  ];
};
