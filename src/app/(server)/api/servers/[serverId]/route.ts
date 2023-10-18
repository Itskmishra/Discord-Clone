import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
    try {
        // Check user authentication
        const profile = await currentProfile()
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        // Get values
        const { name, imageUrl } = await req.json()

        // Find server based on server id and server admin id then update
        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                name,
                imageUrl
            }
        })
        // return updated server.
        return NextResponse.json(server)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function DELETE(req: Request, { params }: { params: { serverId: string } }) {
    try {
        // Check user authentication
        const profile = await currentProfile()
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // Find server based on server id and server admin id then update
        const server = await db.server.delete({
            where: {
                id: params.serverId,
                profileId: profile.id
            }
        })

        // return updated server.
        return NextResponse.json(server)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}