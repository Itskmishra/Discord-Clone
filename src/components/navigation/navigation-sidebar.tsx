import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import NavigationAction from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./navigation-item";
import { ModeToggle } from "../mode-toggle";

interface NavigationSidebarProps {}

const NavigationSidebar: React.FC<NavigationSidebarProps> = async () => {
  // Getting current user id
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  // fetching all the server users is member of.
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      {/* Navigation functions like add and more. */}
      <NavigationAction />
      {/* Separator to seaparte servers and actions. */}
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      {/* Rendering all the joined servers */}
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            {/* Component to show each server */}
            <NavigationItem
              imageUrl={server.imageUrl}
              id={server.id}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
      {/* user and theme button. */}
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{ elements: { avatarBox: "h-[48px] w-[48px]" } }}
        />
      </div>
    </div>
  );
};
export default NavigationSidebar;