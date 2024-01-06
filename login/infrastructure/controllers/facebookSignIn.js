import { getAuth, signInWithPopup, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { firebaseApp } from "/shared/firebaseConfig.js";

document.getElementById("facebookSignInBtn").addEventListener('click', handleGoogleSignIn);

async function handleGoogleSignIn() {
  const auth = getAuth(firebaseApp);
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = "/feed/feed.html";
    }).catch((error) => {
      console.error(error);
    })
}



