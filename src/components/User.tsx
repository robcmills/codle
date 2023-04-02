import { useRouter } from "next/router";
import { useState } from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

import { UserAvatar } from "codle/components/UserAvatar";
import { getPlayerDisplayName } from "codle/utils/getPlayerDisplayName";

export function User() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  const onClickAvatar = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onClickDropdownScreen = () => {
    setIsDropdownOpen(false);
  };

  const signOutCallback = () => {
    router.push("/").catch(console.error);
  };

  const signedIn = !user ? null : (
    <div className="relative hover:cursor-pointer" onClick={onClickAvatar}>
      <UserAvatar user={user} />
      {isDropdownOpen && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0"
          onClick={onClickDropdownScreen}
        >
          <div className="absolute top-14 right-14 grid gap-2 whitespace-nowrap rounded-md border border-gray-500 bg-zinc-900 p-4 text-center">
            <p>
              Signed in as{" "}
              <span className="text-green-500">
                {getPlayerDisplayName(user)}
              </span>
            </p>
            <p className="text-yellow-500">
              <SignOutButton signOutCallback={signOutCallback} />
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return isSignedIn ? signedIn : <SignInButton afterSignInUrl="/" />;
}
