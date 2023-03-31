import { type NextPage } from "next";
import { useRouter } from "next/router";

const GamePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>GamePage {id}</div>;
};

export default GamePage;
