"use client";

import { Hash } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
import UserAvater from "../user-avatar";
import { useEffect, useState } from "react";
import { SocketIndicator } from "../socket-indicator";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  serverId,
  name,
  type,
  imageUrl,
}) => {
  // Hypdration resolve
  const [Mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!Mounted) {
    return null;
  }

  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      {/* Mobile Sidebar Component */}
      <MobileToggle serverId={serverId} />
      {/* Icons based on Type of the page */}
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {/* User Avatar */}
      {type === "conversation" && (
        <UserAvater className="h-8 w-8 md:h-8 md:w-8 mr-2" src={imageUrl} />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  );
};
export default ChatHeader;
