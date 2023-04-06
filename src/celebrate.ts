import _confetti from "canvas-confetti";

const GREEN = "#22c55e"; // bg-green-500
const RED = "#ef4444"; // bg-red-500
const VIOLET = "#8b5cf6"; // bg-violet-500
const WHITE = "#ffffff";
const YELLOW = "#fde047"; // bg-yellow-300

const count = 200;
const confettiDefaults: _confetti.Options = {
  colors: [GREEN, RED, VIOLET, WHITE, YELLOW],
  origin: { y: 0.9 },
};

function confetti(particleRatio: number, opts: _confetti.Options) {
  _confetti({
    ...confettiDefaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio),
  })?.catch(() => {
    throw new Error("Confetti failed to celebrate");
  });
}

function cannon(opts: _confetti.Options = {}) {
  confetti(0.25, {
    ...opts,
    spread: 26,
    startVelocity: 55,
  });
  confetti(0.2, {
    ...opts,
    spread: 60,
  });
  confetti(0.35, {
    ...opts,
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  confetti(0.1, {
    ...opts,
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  confetti(0.1, {
    ...opts,
    spread: 120,
    startVelocity: 45,
  });
}

const starsDefaults: _confetti.Options = {
  colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
  decay: 0.94,
  gravity: 0,
  shapes: ["star"],
  spread: 360,
  startVelocity: 10,
  ticks: 100,
};

function stars() {
  _confetti({
    ...starsDefaults,
    particleCount: 30,
    scalar: 1,
    shapes: ["star"],
  })?.catch(() => {
    throw new Error("Stars failed to celebrate");
  });

  _confetti({
    ...starsDefaults,
    particleCount: 10,
    scalar: 0.25,
    shapes: ["circle"],
  })?.catch(() => {
    throw new Error("Stars failed to celebrate");
  });
}

function explosion() {
  setTimeout(stars, 100);
  setTimeout(stars, 250);
  setTimeout(stars, 500);
  setTimeout(stars, 1000);
}

type CelebrationType = "confetti" | "stars";

export function celebrate(type: CelebrationType = "confetti") {
  if (type === "stars") {
    explosion();
  } else {
    cannon();
  }
}
