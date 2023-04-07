# Codle

Codle is a Wordle clone, for coders!

Try it out here (beta): [https://codle-robcmills.vercel.app](https://codle-robcmills.vercel.app)

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

- TypeScript (Language)
- React (Frontend UI)
- Tailwind (CSS)
- Next.js (Full stack framework)
- tRPC (Full stack typesafe API) (this is the awesome sauce right here)
- Prisma (ORM)
- Planetscale (Database)
- Clerk (Auth service)


### Todo

- [x] Optimize queries generally not to run so often
  + [ ] Especially updateGame (skip if no changes, should not run on initial render)
  + [ ] Cancel/debounce updateGame requests when new ones are triggered
- [x] Handle Sign out at any point
- [x] Account for scenario where all keywords have been solved for a language (100% progress) (badges)
- [ ] Account for scenario where all keywords have been solved for all languages (extra special badge)
- [ ] Replace loading texts with spinners
- [ ] Obfuscate / encrypt codles in request payloads to prevent cheating
  + [ ] And in React local states (introspectable via dev tools)
- [ ] Implement user profile pages to see all individual stats
- [ ] Implement leaderboard with multiple categories
  + [ ] Fastest solver
  + [x] Most games played
  + [ ] Most accurate (highest solve rate with fewest guesses)
  + [ ] Best overall (aggregate leaders)
- [ ] Implement bot to play game and compete for highest score possible
