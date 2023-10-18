import { Server } from '@prisma/client'
import { create } from 'zustand'

export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer"

interface ModalData {
    server?: Server
}

interface ModalStoreProps {
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

