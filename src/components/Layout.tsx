import { Header } from "codle/components/Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="absolute top-0 bottom-0 left-0 right-0 grid auto-rows-min grid-cols-1 justify-items-center overflow-y-auto bg-gradient-to-b from-[#15162c] to-[#343440] text-white">
      <Header />
      {children}
    </main>
  );
}
