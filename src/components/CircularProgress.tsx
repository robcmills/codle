import { useEffect, useState } from "react";

export function CircularProgress({ percentage = 100 }: { percentage: number }) {
  const [offset, setOffset] = useState(100);

  useEffect(() => {
    setOffset(100 - percentage);
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
        strokeDasharray={100}
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
