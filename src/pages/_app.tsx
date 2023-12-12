import { type AppType } from "next/app";
import { api } from "@utils/api";
import { TestProvider } from "@lib/providers/new-test";

import "@styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <TestProvider>
      <Component {...pageProps} />
    </TestProvider>
  );
};

export default api.withTRPC(MyApp);
