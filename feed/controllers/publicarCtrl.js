import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { firebaseApp } from "/shared/firebaseConfig.js";
import { getUserInfo } from "./userInfoCtrl.js";
import { Articulo } from "/articulo/Articulo.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"

const urlActual = window.location.href;
const url = new URL(urlActual);
const nombreURL = url.searchParams.get('name');

document.getElementById("publicarBtn").addEventListener("click", () => {
  const storage = getStorage(firebaseApp);
  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const contenido = tinymce.activeEditor.getContent();
  const documento = document.implementation.createHTMLDocument();
  documento.body.innerHTML = contenido;
  const articleStorage = ref(storage, `${Date.now()}.html`);
  const documentBlob = new Blob([documento.documentElement.outerHTML], { type: 'text/html' });

  uploadBytes(articleStorage, documentBlob).then((snap) => {
    return getDownloadURL(snap.ref).then(downloadURL => {
      return downloadURL;
    });
  }).then(downloadURL => {
    saveToDatabase(titulo, descripcion, downloadURL);
  }).catch(error => {
    console.error(error.message);
  })
});

function saveToDatabase(titulo, descripcion, downloadURL) {
  const nombre = nombreURL ? nombreURL : user.displayName;
  getUserInfo.then(async (user) => {
    const newArticle = new Articulo(
      user.uid,
      nombre,
      titulo,
      descripcion,
      user.photoURL,
      downloadURL,
      new Date(),
    );
    const db = getFirestore(firebaseApp);
    try {
      const docRef = await addDoc(collection(db, "articulos"), newArticle.toObject());
      window.location.reload();
    } catch (e) {
      console.error(e.message);
    }
  }).catch(error => {
    console.error(error.message);
  })
}
