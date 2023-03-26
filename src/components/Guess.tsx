export function Guess({
  codle,
  guess,
  row,
  selectedLetter,
}: {
  codle: string;
  guess: string[];
  row: number;
  selectedLetter: [number, number] | null;
}) {
  const letters = codle.split("").map((codleChar, column) => {
    const guessChar = guess[column];
    const isSelected =
      selectedLetter !== null &&
      selectedLetter[0] === row &&
      selectedLetter[1] === column;
    const borderColor = isSelected ? "blue-500" : "gray-500";

    return (
      <div
        className={`grid h-12 w-12 items-center justify-center border-4 border-${borderColor}`}
        key={column}
      >
        {guessChar}
      </div>
    );
  });

  return (
    <div className="grid grid-flow-col gap-2 text-2xl uppercase text-white">
      {letters}
    </div>
  );
}
