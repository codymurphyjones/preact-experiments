import Avatar from "./UserAvatar.js";

export default function Message(props: {
  icon: string;
  username: string;
  message: string;
}) {
  const icon = props.icon || "JP";
  const username = props.username || "jaredpalmer";
  const message = props.message || "Hello, World!";
  return (
    <div class="flex items-center space-x-4">
      <span
        class="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9"
        data-id="38"
      >
        <span
          class="bg-red-800 flex h-full w-full items-center justify-center rounded-full bg-muted"
          data-id="40"
        >
          {icon}
        </span>
      </span>
      <div>
        <h4 class="text-sm font-semibold">@{username}</h4>
        <p class="text-sm text-gray-500 dark:text-gray-400">{message}</p>
      </div>
    </div>
  );
}
