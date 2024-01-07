import { User } from '/Upiblog/login/domain/User.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { firebaseApp } from "/Upiblog/shared/firebaseConfig.js";


const urlActual = window.location.href;
const url = new URL(urlActual);
const nombreURL = url.searchParams.get('name');

var loggedUser;
const auth = getAuth(firebaseApp);
const getUserInfo = new Promise((resolve) => {
  onAuthStateChanged(auth, (user) => {
    const nombre = nombreURL ? nombreURL : user.displayName;
    if (user) {
      loggedUser = new User(
        user.uid,
        nombre,
        user.email,
        user.photoURL
      );
      resolve(loggedUser);
    }
  });
});
// Muestra la información del usuario en la página
getUserInfo.then((user) => {
  document.getElementById('user-info').innerHTML = `
    <img src="${loggedUser.photoURL}" alt="Perfil de ${loggedUser.displayName}" class="profile-image">
    <p id="user-name">${loggedUser.displayName}</p>
`;
});

export { getUserInfo, loggedUser }
