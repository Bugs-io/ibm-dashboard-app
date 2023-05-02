import withAuth from "@/components/withAuth";

const Dashboard = () => {
  return (
    <div style={{ height: "100vh" }}>
      <h1>Dashboard</h1>
    </div>
  );
};

export default withAuth(Dashboard, { isPrivate: true });
