import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { firebaseApp } from "/Upiblog/shared/firebaseConfig.js";

document.getElementById("cerrarSesion").addEventListener("click", () => {
  const auth = getAuth(firebaseApp);
  signOut(auth).then(() => {
    window.location.href = "/Upiblog/index.html";
  });
})
