import { type AppType } from "next/app";
import Head from "next/head";

import { api } from "codle/utils/api";

import "codle/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Layout } from "codle/components/Layout";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Codle</title>
        <meta name="description" content="Wordle clone for coders" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
};

export default api.withTRPC(App);
