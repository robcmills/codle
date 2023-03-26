export function Guess({
  codle,
  guess,
  row,
  selectedLetter,
}: {
  codle: string;
  guess: string;
  row: number;
  selectedLetter: [number, number];
}) {
  const letters = codle.split("").map((letter, column) => {
    const isSelected =
      selectedLetter[0] === row && selectedLetter[1] === column;
    const borderColor = isSelected ? "blue-500" : "gray-500";
    return (
      <div
        className={`h-12 w-12 border-4 border-${borderColor}`}
        key={column}
      />
    );
  });
  return <div className="grid grid-flow-col gap-2">{letters}</div>;
}
