import { Button } from "codle/components/Button";
import { NUMBER_OF_TRIES } from "codle/constants";

export function Instructions({ onClickPlay }: { onClickPlay: () => void }) {
  return (
    <section className="m-4 border border-gray-500 bg-zinc-900 p-4 text-white">
      <h2 className="text-3xl">How To Play</h2>
      <h4 className="py-2 text-xl">
        Guess the Codle in &nbsp;
        <span className="font-bold text-green-500">{NUMBER_OF_TRIES}</span>
        &nbsp; tries.
      </h4>
      <ul className="list-inside list-disc py-2">
        <li>The Codle will be a keyword from the selected language.</li>
        <li>
          The color of the boxes will change to show how close your guess was to
          the word.
        </li>
        <li>
          <span className="font-bold text-green-700">Green:</span> This letter
          is in the keyword and in the correct location.
        </li>
        <li>
          <span className="font-bold text-yellow-600">Yellow:</span> This letter
          is in the keyword but in a different location.
        </li>
        <li>
          <span className="font-bold text-red-700">Red:</span> This letter is
          not in the keyword.
        </li>
      </ul>
      <div className="grid justify-center pt-6 pb-3">
        <Button text="Play" onClick={onClickPlay} />
      </div>
    </section>
  );
}
