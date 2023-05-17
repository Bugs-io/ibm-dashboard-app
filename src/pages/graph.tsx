import withAuth from "@/components/withAuth";

const Graph = () => <div>graph</div>;

export default withAuth(Graph, { isPrivate: false });
