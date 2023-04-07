export function getPlayerDisplayName(player: {
  firstName?: string | null;
  fullName?: string | null;
  lastName?: string | null;
  username?: string | null;
}) {
  return (
    player.username ||
    player.fullName ||
    [player.firstName, player.lastName].join(" ")
  );
}
