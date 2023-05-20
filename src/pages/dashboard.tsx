import { Navbar } from "@/components";
import GraphGrid from "@/components/GraphGrid";
import withAuth from "@/components/withAuth";
import styles from "../styles/Dashboard.module.scss";

const Dashboard = () => (
  <div style={{ height: "100vh" }}>
    <Navbar />
    <div />
    <h1>Dashboard</h1>
    <div className={styles.container}>
      <GraphGrid />
    </div>
  </div>
);

export default withAuth(Dashboard, { isPrivate: true });
