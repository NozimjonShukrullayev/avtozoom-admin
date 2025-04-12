// import jwt_decode from 'jwt-decode';

// function saveToken(access_token) {
//   localStorage.setItem("access_token", access_token);
// }

// function getToken() {
//   try {
//     return jwt_decode(localStorage.getItem("access_token"));
//   } catch (error) {
//     console.log(error);
//   }
// }

function destroyToken() {
  localStorage.removeItem("access_token");
  window.location.pathname = "/";
}

export { destroyToken };
