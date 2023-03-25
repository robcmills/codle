import { Header } from "codle/components/Header";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Codle</title>
        <meta name="description" content="Wordle clone for coders" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid min-h-screen justify-center bg-gradient-to-b from-[#15162c] to-[#343440]">
        <Header />
      </main>
    </>
  );
};

export default Home;
