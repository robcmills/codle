import { type AppType } from "next/app";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { api } from "codle/utils/api";

import "codle/styles/globals.css";
import { Layout } from "codle/components/Layout";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps} appearance={{ baseTheme: dark }}>
      <Head>
        <title>Codle</title>
        <meta name="description" content="Wordle clone for coders" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {false && <ReactQueryDevtools initialIsOpen={false} />}
    </ClerkProvider>
  );
};

export default api.withTRPC(App);
