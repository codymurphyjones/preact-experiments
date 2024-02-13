export default function ChatRooms() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Chat Rooms
        </h2>
        <div className="mt-4 space-y-4">
          <a
            href="#"
            className="block p-3 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Room 1
            </h3>
          </a>
          <a
            href="#"
            className="block p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Room 2
            </h3>
          </a>
          <a
            href="#"
            className="block p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Room 3
            </h3>
          </a>
        </div>
      </div>
    </aside>
  );
}
