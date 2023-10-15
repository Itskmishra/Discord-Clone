import { create } from 'zustand'


export type ModalType = "createServer"

interface ModalStoreProps {
    type: ModalType | null
    isOpen: boolean
    onOpen: (type: ModalType) => void
    onClose: () => void
}

export const useModal = create<ModalStoreProps>((set) => ({
    type: null,
    isOpen: false,
    onOpen: (type) => set({ type, isOpen: true }),
    onClose: () => set({ type: null, isOpen: false })
}))

