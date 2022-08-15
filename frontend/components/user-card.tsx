import { FC } from "react";
import styles from "../styles/Home.module.css";

type User = {
  id: string;
  name: string;
  email: string;
  statusId: string;
};

const UserCard: FC<{ user: User }> = ({ user }) => {
  return (
    <a key={user.id} href="#" className={styles.card}>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{`Status: ${user.statusId}`}</p>
    </a>
  );
};

export default UserCard;
