let globalUserCredential = null;

export const setGlobalUserCredential = (userCredential) => {
  globalUserCredential = userCredential;
};

export const getGlobalUserCredential = () => {
  return globalUserCredential;
};
