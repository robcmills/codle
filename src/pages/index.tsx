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
        <div className="container items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-[5rem]">
            Codle
          </h1>
        </div>
      </main>
    </>
  );
};

export default Home;
