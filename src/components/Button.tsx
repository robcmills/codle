export function Button({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded border bg-[#343440] py-2 px-6 font-bold text-white hover:bg-[#15162c]"
    >
      {text}
    </button>
  );
}
