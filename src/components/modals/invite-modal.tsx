"use client";

import axios from "axios";
import { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useOrigin } from "@/hooks/user-orgins";

// Interface for the Page
interface InviteModalProps {}

// Main function
const InviteModal: React.FC<InviteModalProps> = () => {
  // get values from context
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";

  const { server } = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  //   FUnction to copy link
  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  // new invite link generator function
  const onNew = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
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
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        {/* Invite link block */}
        <div className="p-6">
          {/* Invite label */}
          <Label className="uppercase text-xs font-bold text-zinc-500 text-secondary/70">
            Server invite link
          </Label>
          {/* Invite link div */}
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inviteUrl}
              disabled={loading}
            />
            {/* Copy button */}
            <Button size={"icon"} onClick={onCopy} disabled={loading}>
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          {/* generate new link */}
          <Button
            variant={"link"}
            size={"sm"}
            className="text-xs text-zinc-500 mt-5"
            disabled={loading}
            onClick={onNew}
          >
            Generate a new link <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default InviteModal;
