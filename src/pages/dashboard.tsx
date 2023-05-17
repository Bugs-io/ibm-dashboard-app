import { Navbar } from "@/components";
import withAuth from "@/components/withAuth";

function Dashboard() {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <div />
      <h1>Dashboard</h1>
    </div>
  );
}

export default withAuth(Dashboard, { isPrivate: true });
