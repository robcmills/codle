import type { UserResource } from "@clerk/types";
import Image from "next/image";

export function UserAvatar({ user }: { user?: UserResource | null }) {
  if (!user) return null;
  return (
    <div className="grid place-items-center">
      <Image
        className="h-8 w-8 rounded-full"
        src={user.profileImageUrl}
        alt={user.username || "User Profile Image"}
        height={32}
        width={32}
      />
    </div>
  );
}
