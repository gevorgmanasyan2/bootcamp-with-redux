export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('login'));
  
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }
//for Node express back
//   export default function authHeader() {
//     const user = JSON.parse(localStorage.getItem('user'));
  
//     if (user && user.accessToken) {
//       // for Node.js Express back-end
//       return { 'x-access-token': user.accessToken };
//     } else {
//       return {};
//     }
//   }