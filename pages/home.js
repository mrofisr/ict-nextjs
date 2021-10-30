import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB4IyDokG4HF9kUmX6clj-TqpiCpFU2-GI",
  authDomain: "petspace-1ebb6.firebaseapp.com",
  projectId: "petspace-1ebb6",
  storageBucket: "petspace-1ebb6.appspot.com",
  messagingSenderId: "396664855565",
  appId: "1:396664855565:web:d83c46fad732ca70308944",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default function Home() {
  return (
    <div>
      <h1>My App : {`${displayName}`}</h1>
    </div>
  );
}
export async function getStaticProps(context) {
  const user = firebase.auth().currentUser;
  if (user == null) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { }, // will be passed to the page component as props
  };
}
