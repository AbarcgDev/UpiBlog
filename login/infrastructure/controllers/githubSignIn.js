import { getAuth, signInWithPopup, GithubAuthProvider, getAdditionalUserInfo } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { firebaseApp } from "/shared/firebaseConfig.js";

document.getElementById("githubSignInBtn").addEventListener('click', handleGoogleSignIn);

async function handleGoogleSignIn() {
  const auth = getAuth(firebaseApp);
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const info = getAdditionalUserInfo(result);
      window.location.href = `/feed/feed.html?name=${info.username}`;
    }).catch((error) => {
      console.error(error.message);
    })
};


