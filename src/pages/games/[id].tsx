import { type NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

import { api } from "codle/utils/api";
import { Codle } from "codle/components/Codle";

const GamePage: NextPage = () => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push("/play").catch(console.error);
  }, [isLoaded, isSignedIn, router]);

  let id = router.query.id;
  if (Array.isArray(id)) {
    id = id[0];
  }
  if (id === undefined) {
    id = "";
  }

  const { data: game, isLoading } = api.game.getById.useQuery(
    { id },
    {
      enabled: !!isSignedIn && !!id,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Codle isSignedIn={!!isSignedIn} game={game} />;
};

export default GamePage;
