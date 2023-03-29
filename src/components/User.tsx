import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export function User() {
  const user = useUser();
  return user.isSignedIn ? <SignOutButton /> : <SignInButton />;
}
