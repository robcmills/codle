import { Codle } from "codle/components/Codle";
import { Header } from "codle/components/Header";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Codle</title>
        <meta name="description" content="Wordle clone for coders" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="absolute top-0 bottom-0 left-0 right-0 grid auto-rows-min grid-cols-1 justify-items-center overflow-y-auto bg-gradient-to-b from-[#15162c] to-[#343440]">
        <Header />
        <Codle />
      </main>
    </>
  );
};

export default Home;
