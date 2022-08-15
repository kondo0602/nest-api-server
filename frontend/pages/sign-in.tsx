import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import SignInForm from "../components/sign-in-form";

import "../utils/firebase/init";

const SignInPage = () => {
  const [userStatus, setUserStatus] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      user ? setUserStatus(true) : setUserStatus(false);
    });

    return () => unsubscribe();
  }, []);

  if (userStatus) {
    // TODO: バックエンドのユーザ一覧を表示するように修正
    return <p>ログイン中</p>;
  } else {
    return <SignInForm />;
  }
};

export default SignInPage;
