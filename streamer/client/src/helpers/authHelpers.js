import store from './../state';

const getState = () => store.getState();

export const isAuthenticated = () => {
  const { auth } = getState();
  return auth && auth.isAuthenticated ? true : false;
}

export const getCurrentUser = () => {
  if (isAuthenticated()) {
    const { auth } = getState();
    return auth.currentUser;
  }
}

export const getCurrentUserId = () => {
  if (isAuthenticated()) {
    const { auth } = getState();
    return auth.currentUser && auth.currentUser.id;
  }
}
