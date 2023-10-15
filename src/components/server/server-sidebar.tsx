import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { channel } from "diagnostics_channel";
import { ChannelType } from "@prisma/client";
import ServerHeader from "./server-header";

interface ServerSidebarPorps {
  serverId: string;
}

export const ServerSidebar = async ({ serverId }: ServerSidebarPorps) => {
  // checked is user loggedin.
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  // Fetch server with channels and members
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  // Filtering channels based on it type.
  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  // all server members
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  if (!server) {
    return redirect("/");
  }
  // Check current user role
  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#f2f3f5]">
			<ServerHeader server={server} role={role}/>
		</div>
  );
};
