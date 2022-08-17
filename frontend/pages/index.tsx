import Head from "next/head";
import styles from "../styles/Home.module.css";

import UserList from "../components/user-list";
import SignOutButton from "../components/sign-out-button";
import { IGetUserResponse } from "../types/UserType";

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3001/user", {
    method: "GET",
  });

  const json = await response.json();

  const props = json;

  return { props };
}

const Home = (props: IGetUserResponse) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Praha Challenge!</a>
        </h1>

        <UserList users={props.user} />
      </main>

      <footer className={styles.footer}>
        <SignOutButton />
      </footer>
    </div>
  );
};

export default Home;
