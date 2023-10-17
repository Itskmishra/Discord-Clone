import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  // check user profile
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  // If params is not there then return it to home page.
  if (!params.inviteCode) {
    return redirect("/");
  }

  // Is user is already a member in the server.
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  // IF user exists return it to the server homepage.
  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  // Add user to the server.
  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  return <div>InviteCodePage</div>;
};
export default InviteCodePage;
