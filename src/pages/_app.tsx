import { type AppType } from "next/app";

import { api } from "codle/utils/api";

import "codle/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
