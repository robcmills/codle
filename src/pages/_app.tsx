import { type AppType } from "next/app";

import { api } from "wordle/utils/api";

import "wordle/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
