import { SignInButton, useUser } from "@clerk/nextjs";
import { UserAvatar } from "codle/components/UserAvatar";

export function User() {
  const { isSignedIn, user } = useUser();
  return isSignedIn ? <UserAvatar user={user} /> : <SignInButton />;
}
