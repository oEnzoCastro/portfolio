import { useState, type CSSProperties } from "react";
import { Cell, Strip, Wheel, Window } from "./styles/TapeCounter.styled";

type TapeCounterProps = {
  value: string;
  rounds?: number;
  className?: string;
};

const DIGITS = "0123456789";

/**
 * A mechanical tape counter. When `value` changes, each wheel rolls through
 * `rounds` of digits and lands on the new character; each wheel starts and
 * stops a little later than the one before. Purely visual (aria-hidden):
 * the parent gives the accessible name.
 */
export function TapeCounter({ value, rounds = 2, className }: TapeCounterProps) {

  const [roll, setRoll] = useState({ from: value, to: value });
  if (roll.to !== value) {
    setRoll({ from: roll.to, to: value });
  }

  const rolling = roll.from !== roll.to;
  const filler = [...DIGITS.repeat(rounds)];

  return (
    <Window className={className} aria-hidden="true">
      {[...roll.to].map((char, index) => {
        const cells = rolling
          ? [roll.from[index] ?? " ", ...filler, char]
          : [char];
        const style = {
          "--steps": cells.length - 1,
          "--index": index,
        } as CSSProperties;

        return (
          <Wheel key={index}>
            <Strip
              key={`${roll.from}>${roll.to}`}
              data-rolling={rolling || undefined}
              style={style}
            >
              {cells.map((cell, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data-digit={
                    (rolling && cellIndex > 0 && cellIndex < cells.length - 1) ||
                    undefined
                  }
                >
                  {cell}
                </Cell>
              ))}
            </Strip>
          </Wheel>
        );
      })}
    </Window>
  );
}
