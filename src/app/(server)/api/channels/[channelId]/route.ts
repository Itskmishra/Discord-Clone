import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { MemberRole } from "@prisma/client"
import { NextResponse } from "next/server"



export async function DELETE(req: Request, { params }: {
    params: {
        channelId: string
    }
}) {
    try {
        const profile = await currentProfile()
        const { searchParams } = new URL(req.url)
        const serverId = searchParams.get("serverId")
        const channelId = params.channelId
        if (!profile) return new NextResponse("Unauthorized", { status: 401 })
        if (!serverId) return new NextResponse("Server ID missing", { status: 400 })
        if (!channelId) return new NextResponse("Channel ID missing", { status: 400 })

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: channelId,
                        name: {
                            not: "general",
                        }
                    }
                }
            }
        })

        return NextResponse.json(server)


    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}




export async function PATCH(req: Request, { params }: {
    params: {
        channelId: string
    }
}) {
    try {
        const profile = await currentProfile()
        const { searchParams } = new URL(req.url)
        const { name, type } = await req.json()
        const serverId = searchParams.get("serverId")
        const channelId = params.channelId

        if (!profile) return new NextResponse("Unauthorized", { status: 401 })
        if (!serverId) return new NextResponse("Server ID missing", { status: 400 })
        if (!channelId) return new NextResponse("Channel ID missing", { status: 400 })
        if (!name || !type) return new NextResponse("All parameter are required", { status: 400 })
        if (name.toLocaleLowerCase() === "general") return new NextResponse("You can not name channel 'general'", { status: 400 })

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    update: {
                        where: {
                            id: channelId,
                            name: {
                                not: "general",
                            }
                        },
                        data: {
                            name,
                            type
                        }
                    }
                }
            }
        })

        return NextResponse.json(server)

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}