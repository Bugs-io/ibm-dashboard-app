import Head from "next/head";
import { useState } from "react";
import { Navbar } from "@/components";
import { Notification } from "@/components/UploadFileModal";
import GraphGrid from "@/components/GraphGrid";
import withAuth from "@/components/withAuth";
import styles from "../styles/Dashboard.module.scss";

const Dashboard = () => {
  const [succesNotification, setSuccessNotification] = useState<boolean>(false);

  const handleSuccess = (success: boolean) => {
    setSuccessNotification(success);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Head>
        <title>IBM Strategic Dashboard</title>
      </Head>
      <Navbar handleNotification={handleSuccess} />
      <div style={{ marginBottom: 32 }} />
      <div className={styles.container}>
        <GraphGrid />
      </div>
      {succesNotification && (
        <Notification handleNotification={handleSuccess} />
      )}
    </div>
  );
};

export default withAuth(Dashboard, { isPrivate: true });
