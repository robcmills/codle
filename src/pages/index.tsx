import { type NextPage } from "next";
import { Instructions } from "codle/components/Instructions";
import { api } from "codle/utils/api";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

const IndexPage: NextPage = () => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { data: game, isLoading } = api.game.get.useQuery(undefined, {
    enabled: !!isSignedIn,
  });

  const onClickPlay = () => {
    if (isSignedIn && game) {
      router.push(`/games/${game.id}`).catch(console.error);
    } else {
      router.push("/play").catch(console.error);
    }
  };

  return (
    <Instructions {...{ onClickPlay, isLoading: !!isSignedIn && isLoading }} />
  );
};

export default IndexPage;
