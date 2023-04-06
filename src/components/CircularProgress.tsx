import { celebrate } from "codle/celebrate";
import { useEffect, useState } from "react";

export function CircularProgress({ percentage = 100 }: { percentage: number }) {
  const [offset, setOffset] = useState(100);

  useEffect(() => {
    // Let at least one render happen, else the transition will not trigger
    setTimeout(() => {
      setOffset(100 - percentage);
    }, 1);

    if (percentage === 100) {
      setTimeout(() => {
        celebrate("stars");
      }, 1000);
    }
  }, [percentage]);

  const size = 150;
  const radius = 45;
  const strokeWidth = 10;

  return (
    <svg
      height={size}
      id="svg"
      version="1.1"
      viewBox="0 0 100 100"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        fill="transparent"
        pathLength={100}
        r={radius}
        stroke="#666"
        strokeDasharray={101}
        strokeDashoffset={0}
        strokeWidth={strokeWidth}
      />
      <circle
        cx="50"
        cy="50"
        fill="transparent"
        pathLength={100}
        r={radius}
        stroke="#FF9F1E"
        strokeDasharray={101}
        strokeDashoffset={offset}
        strokeWidth={strokeWidth}
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "center",
          transition: "stroke-dashoffset 1s ease",
        }}
      />
    </svg>
  );
}
