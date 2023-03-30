import { type AppType } from "next/app";

import { api } from "codle/utils/api";

import "codle/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Layout } from "codle/components/Layout";

const App: AppType = ({ Component, pageProps }) => {
  console.log("App");
  return (
    <ClerkProvider {...pageProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
};

export default api.withTRPC(App);
