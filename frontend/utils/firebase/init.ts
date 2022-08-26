import firebase from "firebase/compat/app";

// https://console.firebase.google.com/u/0/project/nest-api-server/settings/general/web:MzliYmYzMDMtYWNhZC00ZWZiLTkxN2UtMzQ5NTQxMDQ2YTIx
const config = {
  apiKey: "AIzaSyCoOj9RP4KyGBpJttb2rf-965A1Q1HYTI4",
  authDomain: "nest-api-server.firebaseapp.com",
  projectId: "nest-api-server",
  storageBucket: "nest-api-server.appspot.com",
  messagingSenderId: "992523588163",
  appId: "1:992523588163:web:ae8b108155461a620efaf6",
};

// FirebaseAppインスタンスを初期化する
firebase.initializeApp(config);
