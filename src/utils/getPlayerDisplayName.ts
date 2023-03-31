import type { UserResource } from "@clerk/types";

export function getPlayerDisplayName(player: UserResource) {
  return player.username || player.fullName;
}
