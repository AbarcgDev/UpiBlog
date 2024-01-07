import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { firebaseApp } from "/UpiBlog/shared/firebaseConfig.js";

document.getElementById("googleSignInBtn").addEventListener('click', handleGoogleSignIn);

async function handleGoogleSignIn() {
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      window.location.href = "/Upiblog/feed/feed.html";
    }).catch((error) => {
      console.error(error);
    })
}



