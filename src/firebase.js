import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyChwXw7MeBjgLjf9ApWCQYt8gIF_H7v-dw",
    authDomain: "mydiary-5e8ba.firebaseapp.com",
    databaseURL: "https://mydiary-5e8ba.firebaseio.com",
    projectId: "mydiary-5e8ba",
    storageBucket: "mydiary-5e8ba.appspot.com",
    messagingSenderId: "584348600293",
    appId: "1:584348600293:web:394e441f2bd0a267a2910c",
    measurementId: "G-D4X87SWSY4"
  };

firebase.initializeApp(firebaseConfig);  
export default firebase
  

// import firebase from 'firebase';

// const firebaseConfig = {
//     apiKey: "AIzaSyChwXw7MeBjgLjf9ApWCQYt8gIF_H7v-dw",
//     authDomain: "mydiary-5e8ba.firebaseapp.com",
//     databaseURL: "https://mydiary-5e8ba.firebaseio.com",
//     projectId: "mydiary-5e8ba",
//     storageBucket: "mydiary-5e8ba.appspot.com",
//     messagingSenderId: "584348600293",
//     appId: "1:584348600293:web:394e441f2bd0a267a2910c",
//     measurementId: "G-D4X87SWSY4"
//   };

// const fire = firebase.initializeApp(firebaseConfig);  
// export default fire;