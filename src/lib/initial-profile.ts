import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from '@/lib/db'


export const initialProfile = async () => {

    // Getting current logged in user
    const user = await currentUser()
    
    if (!user) {
        return redirectToSignIn();
    }

    // Fetch profile of the user
    const profile = await db.profile.findFirst({
        where: {
            userId: user.id
        }
    })

    if (profile) {
        return profile
    }

    // If no profile then create a new profile for the user.
    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    })

    return newProfile
}
