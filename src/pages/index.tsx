import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Login from "./login";

export default function Home() {
  return (
    <>
      <Head>
        <title>Strategic Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Login />
      </main>
    </>
  );
}
