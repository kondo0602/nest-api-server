import { FC } from "react";
import styles from "../styles/Home.module.css";

import { IUser } from "../types/UserType";

const UserCard: FC<{ user: IUser }> = ({ user }) => {
  return (
    <a key={user.id} href="#" className={styles.card}>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{`Status: ${user.statusId}`}</p>
    </a>
  );
};

export default UserCard;
