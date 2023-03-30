import type { UserResource } from "@clerk/types";

export function UserAvatar({ user }: { user?: UserResource | null }) {
  if (!user) return null;
  return (
    <div className="grid place-items-center">
      <img
        className="h-8 w-8 rounded-full"
        src={user.profileImageUrl}
        alt={user.username || "User Profile Image"}
      />
    </div>
  );
}