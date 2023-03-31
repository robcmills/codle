import { type NextPage } from "next";
import { Instructions } from "codle/components/Instructions";
import { api } from "codle/utils/api";
import { useEffect } from "react";
import { useRouter } from "next/router";

const IndexPage: NextPage = () => {
  const router = useRouter();

  const { data: existingGame, isFetched } = api.game.get.useQuery();
  const {
    data: newGame,
    mutate: createGame,
    isLoading: isCreating,
  } = api.game.create.useMutation();

  useEffect(() => {
    if (isFetched && !existingGame && !isCreating && !newGame) {
      createGame({ language: "JavaScript" });
    }
  }, [createGame, existingGame, isCreating, isFetched, newGame]);

  const game = existingGame || newGame;

  const onClickPlay = () => {
    if (!game) throw new Error("No game to play");
    router.push(`/games/${game.id}`).catch(console.error);
  };

  return <Instructions onClickPlay={onClickPlay} isLoading={!game} />;
};

export default IndexPage;
