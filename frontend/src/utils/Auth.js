function login(userData) {
  alert("login successfully");
  localStorage.setItem('user', JSON.stringify(userData));
}

function logout() {
  alert("logout successfully");
  localStorage.removeItem('user');
}

function isLoggedIn() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export { isLoggedIn, login, logout };
