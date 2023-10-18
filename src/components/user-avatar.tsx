import { cn } from "@/lib/utils";
import { AvatarImage, Avatar } from "./ui/avatar";

interface UserAvaterProps {
  src?: string;
  className?: string;
}

const UserAvater: React.FC<UserAvaterProps> = ({ src, className }) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} className={className} />
    </Avatar>
  );
};
export default UserAvater;
