/**
 * https://nextjs.org/docs/api-reference/next/router#resetting-state-after-navigation
 * When navigating to the same page in Next.js, the page's state will not be reset by default as React does not unmount unless the parent component has changed.
 * This leads to inconsistent behavior when navigating between new, existing and
 * visited games on the /games/[id] page.
 * This function is a hack around this issue. We simply manually reset state as
 * needed when changing games, and update the URL to match the new game in this
 * way that avoids triggering Next.js's router.
 */
export function replaceUrl(url: string) {
  window.history.replaceState(
    { ...window.history.state, as: url, url },
    "",
    url
  );
}
