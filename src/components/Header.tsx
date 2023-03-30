import { User } from "codle/components/User";

export function Header() {
  return (
    <div className="relative grid w-full p-2 text-white">
      <h1 className="text-center text-5xl font-bold">Codle</h1>
      <div className="absolute top-0 right-0 bottom-0 grid p-5">
        <User />
        {/* Todo: Add dropdown to sign out */}
      </div>
    </div>
  );
}
