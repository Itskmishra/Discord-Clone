import { Hash } from "lucide-react";

interface ChatWelcomeProps {
  type: "channel" | "conversation";
  name: string;
}

const ChatWelcome: React.FC<ChatWelcomeProps> = ({ type, name }) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      {/* Icon */}
      {type === "channel" && (
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Hash className="h-12 w-12 text-white" />
        </div>
      )}
      {/* Welcome message */}
      <p className="text-xl md:text-3xl font-bold">
        {type === "channel" ? "Welcome to #" : ""}
        {name}
      </p>
      {/* Help text  */}
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        {type === "channel"
          ? `The is the start of the #${name} channel.`
          : `The is the start of your conversation with ${name}`}
      </p>
    </div>
  );
};
export default ChatWelcome;
