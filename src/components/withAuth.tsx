import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { NextPage } from "next";
import { Loading } from "carbon-components-react";

type Props = {
  isPrivate?: boolean;
};

const withAuth = (Page: NextPage, { isPrivate = false }: Props) => {
  const WithAuthComponent: NextPage = (props) => {
    const { isAuthenticated, isLoadingAuth } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!isLoadingAuth) {
        if (isPrivate && !isAuthenticated) {
          router.push("/login");
        } else if (!isPrivate && isAuthenticated) {
          router.push("/");
        }
      }
    }, [isAuthenticated, isLoadingAuth, isPrivate, router]);

    if (isLoadingAuth) {
      return <Loading />;
    }

    return <Page {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
