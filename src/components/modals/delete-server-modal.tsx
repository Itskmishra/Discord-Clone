"use client";

import axios from "axios";
import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

// Interface for the Page
interface DeleteServerProps {}

// Main function
const DeleteServer: React.FC<DeleteServerProps> = () => {
  const router = useRouter();

  // get values from context
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const isModalOpen = isOpen && type === "deleteServer";

  const { server } = data;
  const [loading, setLoading] = useState(false);

  const handleDeleteServer = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);
      onClose();
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        {/* Modal title */}
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Are you sure you want to delete this server ? <br />
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>{" "}
            will be permanently deleted and all the data will be lost.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={loading}
              onClick={() => onClose()}
              variant={"ghost"}
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant={"primary"}
              onClick={handleDeleteServer}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteServer;
