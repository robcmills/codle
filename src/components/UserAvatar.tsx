import Image from "next/image";

import { getPlayerDisplayName } from "codle/utils/getPlayerDisplayName";

type User = {
  profileImageUrl: string;
  username: string | null;
};

export function UserAvatar({ user }: { user?: User | null }) {
  if (!user) return null;
  return (
    <div className="grid place-items-center">
      <Image
        className="h-8 w-8 rounded-full"
        src={user.profileImageUrl}
        alt={getPlayerDisplayName(user) || "User Profile Image"}
        height={32}
        width={32}
      />
    </div>
  );
}
