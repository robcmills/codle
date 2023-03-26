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
    const guessChar = guess[column] as string;

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
        className={`${backgroundColor} grid h-12 w-12 items-center justify-center ${border} ${borderColor}`}
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
