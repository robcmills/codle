import { Codle } from "codle/components/Codle";
import { api } from "codle/utils/api";
import { type NextPage } from "next";
import { useRouter } from "next/router";

// Todo: Redirect to /play if not signed in

const GamePage: NextPage = () => {
  const router = useRouter();
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
      enabled: id !== "",
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Codle game={game} />;
};

export default GamePage;
