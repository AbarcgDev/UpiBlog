class Articulo {
  #uidAuthor;
  #nombreAuthor
  #titulo;
  #descripcion;
  #photoAuthorURL;
  #downloadURL;
  #fechaUltimaEdicion;

  constructor(uidAuthor, nombreAuthor, titulo, descripcion, photoAuthorURL, downloadURL, fechaUltimaEdicion) {
    this.#uidAuthor = uidAuthor;
    this.#nombreAuthor = nombreAuthor;
    this.#descripcion = descripcion;
    this.#titulo = titulo
    this.#photoAuthorURL = photoAuthorURL;
    this.#downloadURL = downloadURL;
    this.#fechaUltimaEdicion = fechaUltimaEdicion
  }

  // Getters
  get uidAuthor() {
    return this.#uidAuthor;
  }

  get nombreAuthor() {
    return this.#nombreAuthor;
  }

  get titulo() {
    return this.#titulo;
  }

  get descripcion() {
    return this.#descripcion;
  }

  get photoAuthorURL() {
    return this.#photoAuthorURL;
  }

  get fechaUltimaEdicion() {
    return this.#fechaUltimaEdicion;
  }

  // Setters
  set uidAuthor(newUidAuthor) {
    this.#uidAuthor = newUidAuthor;
  }

  set nombreAuthor(newNombreAuthor) {
    this.#nombreAuthor = newNombreAuthor;
  }

  set titulo(newTitulo) {
    this.#titulo = newTitulo;
  }

  set descripcion(newDescripcion) {
    this.#descripcion = newDescripcion;
  }

  set photoAuthorURL(newPhotoAuthorURL) {
    this.#photoAuthorURL = newPhotoAuthorURL;
  }

  set fechaUltimaEdicion(newFechaUltimaEdicion) {
    this.#fechaUltimaEdicion = newFechaUltimaEdicion;
  }

  toObject() {
    return {
      uidAuthor: this.#uidAuthor,
      nombreAuthor: this.#nombreAuthor,
      titulo: this.#titulo,
      descripcion: this.#descripcion,
      photoAuthorURL: this.#photoAuthorURL,
      downloadURL: this.#downloadURL,
      fechaUltimaEdicion: this.#fechaUltimaEdicion.toISOString(), // Convertir a formato ISO para almacenar la fecha
    };
  }
}

export { Articulo };

