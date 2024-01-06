import { getFirestore, collection, doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
import { firebaseApp } from "/shared/firebaseConfig.js"
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage, ref, getBlob, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const auth = getAuth(firebaseApp);
const parametrosURL = new URLSearchParams(window.location.search);
const idArticulo = parametrosURL.get("articleID");
const db = getFirestore(firebaseApp);
const st = getStorage(firebaseApp);
const collectionRef = collection(db, "articulos");
const docRef = doc(collectionRef, idArticulo);
const confirmaEliminar = document.getElementById("confirmaEliminar");

var articleDownloadUrl;


onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const consulta = await getDoc(docRef);
      const articulo = consulta.data();
      document.title = articulo.titulo;
      document.getElementById("titulo-articulo").textContent = articulo.titulo;
      document.getElementById("autor-articulo").textContent = articulo.nombreAuthor;
      document.getElementById("desc-articulo").textContent = articulo.descripcion;
      document.getElementById("autor-foto").src = articulo.photoAuthorURL;
      articleDownloadUrl = articulo.downloadURL;
      const articleBodyRef = ref(st, articleDownloadUrl);
      const articleBlob = await getBlob(articleBodyRef);
      const htmlText = blobToText(articleBlob);
      htmlText.then((contenidoArticulo) => {
        document.getElementById("cuerpo-articulo").innerHTML = contenidoArticulo;
      }).catch(e => {
        console.error(e.message);
      })
      if (user.uid === articulo.uidAuthor) {
        document.getElementById("toolbar").style.display = "flex";
      }
    } catch (e) {
      console.error(e.message);
    }
  }
})

function blobToText(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function() {
      resolve(reader.result)
    }

    reader.onerror = function(error) {
      reject(error);
    }

    reader.readAsText(blob);
  });
}

document.getElementById("editar-articulo").addEventListener("click", () => {
  tinymce.init({
    selector: '#editor',
    height: 1000,
    plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
  }).then(() => {
    const cuerpoArticulo = document.getElementById("cuerpo-articulo");
    const contenidoActual = cuerpoArticulo.innerHTML;
    cuerpoArticulo.style.display = "none";
    document.getElementById("editor-container").style.display = "block";
    tinymce.get("editor").setContent(contenidoActual);
  });
});

document.getElementById("guardar-edicion").addEventListener("click", () => {
  const titulo = document.getElementById("titulo-articulo").value;
  const descripcion = document.getElementById("desc-articulo").value;
  const contenido = tinymce.activeEditor.getContent();
  const documento = document.implementation.createHTMLDocument();
  documento.body.innerHTML = contenido;
  const articleStorage = ref(st, `${Date.now()}.html`);
  const oldArticle = ref(st, articleDownloadUrl);
  const documentBlob = new Blob([documento.documentElement.outerHTML], { type: 'text/html' });
  deleteObject(oldArticle).then(() => {
    uploadBytes(articleStorage, documentBlob).then((snap) => {
      return getDownloadURL(snap.ref).then(downloadURL => {
        return downloadURL;
      });
    }).then(downloadURL => {
      updateToDatabase(new Date().toISOString(), downloadURL).then(() => {
        window.location.reload();
      });
    }).catch(error => {
      console.error(error.message);
    })
  });
});

async function updateToDatabase(lastUpdateDate, newDownloadURL) {
  await updateDoc(docRef, {
    fechaUltimaEdicion: lastUpdateDate,
    downloadURL: newDownloadURL,
  })
}

document.getElementById("eliminar-articulo").addEventListener("click", () => {
  confirmaEliminar.style.display = "block";
});

document.getElementById("cancelarBtn").addEventListener("click", () => {
  confirmaEliminar.style.display = "none";
});

document.getElementById("confirmarBtn").addEventListener("click", () => {
  const documentContentRef = ref(st, articleDownloadUrl);
  deleteObject(documentContentRef).then(() => {
    deleteDoc(docRef).then(() => {
      window.location.href = "/feed/feed.html"
    })
  })
});
