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
    const guessChar = guess[column] || "";

    // Todo: Handle case where guess letters are repeated
    const isSubmitted = guess.length === codle.length;
    const isCorrect = codleChar === guessChar;
    const isClose = !isCorrect && codle.includes(guessChar);
    const backgroundColor = !isSubmitted
      ? "bg-transparent"
      : isCorrect
      ? "bg-green-700"
      : isClose
      ? "bg-yellow-600"
      : "bg-red-700";

    const border = isSubmitted ? "" : "border-4";
    const isSelected =
      selectedLetter !== null &&
      selectedLetter[0] === row &&
      selectedLetter[1] === column;
    const borderColor = isSelected ? "border-gray-100" : "border-gray-500";

    return (
      <div
        className={`${backgroundColor} grid place-items-center ${border} ${borderColor}`}
        key={column}
      >
        {guessChar}
      </div>
    );
  });

  return (
    <div
      className="grid h-[3rem] justify-center gap-2 text-2xl uppercase text-white"
      style={{
        gridTemplateColumns: `repeat(${codle.length}, minmax(1.5rem, 3rem))`,
      }}
    >
      {letters}
    </div>
  );
}
