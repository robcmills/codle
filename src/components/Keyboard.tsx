const LAYOUT = [
  ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
  ["j", "k", "l", "m", "n", "o", "p", "q", "r"],
  ["s", "t", "u", "v", "w", "x", "y", "z", "⌫ "],
];

export function Keyboard({
  setLetter,
  deleteLetter,
}: {
  setLetter: (letter: string) => void;
  deleteLetter: () => void;
}) {
  const keys = LAYOUT.map((row, rowIndex) => {
    const rowKeys = row.map((letter, columnIndex) => {
      return (
        <button
          className="grid justify-center rounded border border-gray-700 bg-gray-700 py-2 px-4 font-mono text-xl font-bold uppercase hover:border-gray-100"
          key={columnIndex}
          onClick={() => {
            if (letter === "⌫ ") {
              deleteLetter();
            } else {
              setLetter(letter);
            }
          }}
        >
          {letter}
        </button>
      );
    });
    return (
      <div className="grid grid-cols-9 gap-2" key={rowIndex}>
        {rowKeys}
      </div>
    );
  });
  return <div className="grid grid-flow-row gap-2 p-4 text-white">{keys}</div>;
}
