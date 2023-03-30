import { type NextPage } from "next";
import Head from "next/head";
import { Instructions } from "codle/components/Instructions";
import { api } from "codle/utils/api";
// import { useEffect } from "react";

const IndexPage: NextPage = () => {
  console.log("IndexPage");

  const { mutate } = api.game.create.useMutation();
  // useEffect(() => {
  //   mutate({ language: "JavaScript" });
  // }, [mutate]);

  const onClickPlay = () => {
    console.log("onClickPlay");
    mutate({ language: "JavaScript" });
  };

  return (
    <>
      <Head>
        <title>Codle</title>
        <meta name="description" content="Wordle clone for coders" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Instructions onClickPlay={onClickPlay} />
    </>
  );
};

export default IndexPage;
