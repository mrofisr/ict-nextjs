// Import the functions you need from the SDKs you need
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/home",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

// Initialize Firebase

export default function Home() {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}
