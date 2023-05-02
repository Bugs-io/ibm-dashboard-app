import { Loading, Theme } from "carbon-components-react";
import { AuthProvider, ProtectRoute } from "@/contexts/AuthContext";
import "../index.scss";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Theme theme="g100">
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Theme>
  );
}
