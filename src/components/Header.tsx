import Link from "next/link";

import { Menu } from "codle/components/Menu";
import { User } from "codle/components/User";

export function Header() {
  return (
    <div className="relative grid w-full p-2 text-white">
      <Menu />
      <Link href="/" className="text-center text-5xl font-bold">
        Codle
      </Link>
      <div className="absolute top-4 right-4">
        <User />
      </div>
    </div>
  );
}
