export function Button({
  disabled,
  text,
  onClick,
}: {
  disabled?: boolean;
  text: string;
  onClick?: () => void | Promise<void>;
}) {
  return (
    <button
      disabled={disabled}
      className={`rounded border bg-[#343440] py-2 px-6 font-bold text-white hover:bg-[#15162c] ${
        disabled ? "opacity-50" : ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
