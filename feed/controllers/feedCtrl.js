import { getFirestore, getDocs, collection, query, orderBy, limit, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
import { firebaseApp } from "/shared/firebaseConfig.js";
import { Articulo } from "/articulo/Articulo.js"
import { loggedUser } from "./userInfoCtrl.js"

const LIMITE_PAGINA = 20;
var articulos = [];
const db = getFirestore(firebaseApp);
const articulosRef = collection(db, "articulos");

document.getElementById("createArticleBtn").addEventListener("click", showCreateElement);
document.addEventListener("DOMContentLoaded", obtenerArticulos);
document.getElementById("showUserArticlesBtn").addEventListener("click", obtenerArticulosDelUsuario);

function showCreateElement() {
  document.getElementById("createArticleBtn").style.display = "none";
  document.getElementById("feed").style.display = "none";
  document.getElementById("articleCreation").style.display = "block";
  tinymce.init({
    selector: '#editor',
    height: 1000,
    plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
  });
}

async function obtenerArticulos() {
  const q = query(articulosRef, orderBy('fechaUltimaEdicion', 'desc'), limit(LIMITE_PAGINA));
  const snapshot = await getDocs(q)
  const feed = document.getElementById("feed");
  snapshot.forEach(articulo => {
    const dataArticulo = articulo.data();
    articulos.push({
      idArticulo: articulo.id,
      articulo: new Articulo(
        dataArticulo.uidAuthor,
        dataArticulo.nombreAuthor,
        dataArticulo.titulo,
        dataArticulo.descripcion,
        dataArticulo.photoAuthorURL,
        dataArticulo.downloadURL,
        new Date(dataArticulo.fechaUltimaEdicion),
      )
    });
  });
  articulos.forEach((elemento) => {
    const card = document.createElement("div");
    card.classList.add("article-card");
    const title = document.createElement("h2");
    title.textContent = elemento.articulo.titulo;
    card.appendChild(title);
    const desc = document.createElement("p")
    desc.textContent = elemento.articulo.descripcion;
    card.appendChild(desc);
    const autorInfo = document.createElement("div");
    autorInfo.classList.add("autorInfo-card");
    const autorFoto = document.createElement("img");
    autorFoto.src = elemento.articulo.photoAuthorURL;
    autorInfo.appendChild(autorFoto);
    const autorNombre = document.createElement("p");
    autorNombre.textContent = elemento.articulo.nombreAuthor;
    autorInfo.appendChild(autorNombre);
    card.appendChild(autorInfo);
    const link = document.createElement("a");
    link.href = `/articulo/articulo.html?articleID=${elemento.idArticulo}`;
    link.textContent = "Ver Articulo"
    card.appendChild(link);
    feed.appendChild(card);
  });
}

async function obtenerArticulosDelUsuario() {
  console.log(loggedUser.uid);
  const q = query(articulosRef, where("uidAuthor", "==", loggedUser.uid), limit(LIMITE_PAGINA));
  getDocs(q).then((snapshot) => {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";
    articulos = [];
    snapshot.forEach(articulo => {
      const dataArticulo = articulo.data();
      articulos.push({
        idArticulo: articulo.id,
        articulo: new Articulo(
          dataArticulo.uidAuthor,
          dataArticulo.nombreAuthor,
          dataArticulo.titulo,
          dataArticulo.descripcion,
          dataArticulo.photoAuthorURL,
          dataArticulo.downloadURL,
          new Date(dataArticulo.fechaUltimaEdicion),
        )
      });
    });
    articulos.forEach((elemento) => {
      const card = document.createElement("div");
      card.classList.add("article-card");
      const title = document.createElement("h2");
      title.textContent = elemento.articulo.titulo;
      card.appendChild(title);
      const desc = document.createElement("p")
      desc.textContent = elemento.articulo.descripcion;
      card.appendChild(desc);
      const autorInfo = document.createElement("div");
      autorInfo.classList.add("autorInfo-card");
      const autorFoto = document.createElement("img");
      autorFoto.src = elemento.articulo.photoAuthorURL;
      autorInfo.appendChild(autorFoto);
      const autorNombre = document.createElement("p");
      autorNombre.textContent = elemento.articulo.nombreAuthor;
      autorInfo.appendChild(autorNombre);
      card.appendChild(autorInfo);
      const link = document.createElement("a");
      link.href = `/articulo/articulo.html?articleID=${elemento.idArticulo}`;
      link.textContent = "Ver Articulo"
      card.appendChild(link);
      feed.appendChild(card);
    });

  }).catch(e => {
    console.error(e.message);
  });
}
