import { useEffect } from "react";
import Router from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import SignInForm from "../components/sign-in-form";

import "../utils/firebase/init";

const SignInPage = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) Router.replace("/");
    });

    return () => unsubscribe();
  }, []);

  return <SignInForm />;
};

export default SignInPage;
