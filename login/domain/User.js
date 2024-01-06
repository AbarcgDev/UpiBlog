class User {
  #uid;
  #displayName;
  #email;
  #photoURL;

  constructor(uid, displayName, email, photoURL) {
    this.#uid = uid;
    this.#displayName = displayName;
    this.#email = email;
    this.#photoURL = photoURL;
  }

  // Getters
  get uid() {
    return this.#uid;
  }

  get displayName() {
    return this.#displayName;
  }

  get email() {
    return this.#email;
  }

  get photoURL() {
    return this.#photoURL;
  }
}

export { User };

