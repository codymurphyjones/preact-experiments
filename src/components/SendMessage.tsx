export default function SendMessage() {
  return (
    <div className="p-4 border-t" data-id="31">
      <input
        id="send-message"
        className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
        placeholder="Type a message…"
        data-id="32"
      />
    </div>
  );
}
