import { FC } from "react";
import styles from "../styles/Home.module.css";

import UserCard from "../components/user-card";

type User = {
  id: string;
  name: string;
  email: string;
  statusId: string;
};

const UserList: FC<{ users: User[] }> = ({ users }) => {
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
