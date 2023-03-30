import { useRouter } from "next/router";

export default function GamePage() {
  console.log("GamePage");
  const router = useRouter();
  const { id } = router.query;
  return <div>GamePage {id}</div>;
}
