export default function authHeader() {
    // const user = JSON.parse(localStorage.getItem('login'));
    const user = localStorage.getItem('user')
  
    if (user) {
      return 'Bearer ' + user ;
    } else {
      return '';
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