import { Channel, ChannelType, Server } from '@prisma/client'
import { create } from 'zustand'

export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" |
    "messageFile" | "deleteMessage"

export interface ModalData {
    server?: Server
    channel?: Channel
    channelType?: ChannelType
    apiUrl?: string
    query?: Record<string, any>
}

export interface ModalStoreProps {
    type: ModalType | null
    data: ModalData
    isOpen: boolean
    onOpen: (type: ModalType, data?: ModalData) => void
    onClose: () => void
}

// Modal Context
export const useModal = create<ModalStoreProps>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
    onClose: () => set({ type: null, isOpen: false })
}))

