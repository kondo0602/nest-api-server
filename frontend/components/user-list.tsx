import { FC } from "react";
import styles from "../styles/Home.module.css";

import UserCard from "../components/user-card";
import { IUser } from "../types/UserType";

const UserList: FC<{ users: IUser[] }> = ({ users }) => {
  return (
    <div>
      <h2>User List</h2>
      <div className={styles.grid}>
        {users.map((user) => (
          <UserCard user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
