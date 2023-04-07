import { useState } from "react";
import Link from "next/link";

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div
        className="absolute top-[0.56rem] left-[1.2rem] text-4xl hover:cursor-pointer hover:text-yellow-500"
        onClick={toggle}
      >
        ≡
      </div>
      {isOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0" onClick={toggle}>
          <div className="absolute top-14 left-4 grid gap-4 whitespace-nowrap rounded-md border border-gray-500 bg-zinc-900 p-4">
            <Link href="/" className="hover:text-yellow-500">
              How to play
            </Link>
            <Link href="/leaderboard" className="hover:text-yellow-500">
              Leaderboard
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
