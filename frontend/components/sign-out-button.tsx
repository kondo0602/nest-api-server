import { getAuth, signOut } from "firebase/auth";

import "../utils/firebase/init";

const SignOutButton = () => {
  return <button onClick={() => signOut(getAuth())}>Sign Out</button>;
};

export default SignOutButton;
