export const getUser = () => {
  const storage = localStorage.getItem('user');
  try {
    const user = JSON.parse(storage);
    return user || {};
  } catch (e) {
    return undefined;
  }
}

export const setUser = (user) => {
  if (user && user.token) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.setItem('user', {});
  }
}