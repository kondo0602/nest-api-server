import Router from "next/router";

import SignInForm from "../components/sign-in-form";
import { useAuthState } from "../hooks/useAuthState";

const SignInPage = () => {
  const { isSignedIn } = useAuthState();

  // 既にログイン済みの場合はHomeにリダイレクトする
  if (isSignedIn) Router.replace("/");

  return <SignInForm />;
};

export default SignInPage;
