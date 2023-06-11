/* eslint-disable react/function-component-definition */
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { NextPage } from "next";
import { Loading } from "carbon-components-react";

type Props = {
  isPrivate?: boolean;
};

const withAuth = (Page: NextPage, { isPrivate = false }: Props): NextPage => {
  const WithAuthComponent: NextPage = (props) => {
    const { isAuthenticated, isLoadingAuth, accessToken } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!isLoadingAuth) {
        if (isPrivate && !accessToken) {
          router.push("/");
        } else if (!isPrivate && accessToken) {
          router.push("/dashboard");
        }
      }
    }, [isAuthenticated, isLoadingAuth, accessToken]);

    return isLoadingAuth ? <Loading /> : <Page {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
