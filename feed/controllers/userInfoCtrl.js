import { User } from '/login/domain/User.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { firebaseApp } from "/shared/firebaseConfig.js";

var loggedUser;
const auth = getAuth(firebaseApp);
const getUserInfo = new Promise((resolve) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loggedUser = new User(
        user.uid,
        user.displayName,
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
    <p>${loggedUser.displayName}</p>
`;
});

export { getUserInfo, loggedUser }
