import { type NextPage } from "next";
import { Instructions } from "codle/components/Instructions";
import { api } from "codle/utils/api";
import { useRouter } from "next/router";

const IndexPage: NextPage = () => {
  const router = useRouter();

  const { data: game } = api.game.get.useQuery();

  const onClickPlay = () => {
    if (!game) throw new Error("No game to play");
    router.push(`/games/${game.id}`).catch(console.error);
  };

  return <Instructions onClickPlay={onClickPlay} isLoading={!game} />;
};

export default IndexPage;
