import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCHcDY6Bnfmo46ShlKVEx898TN4uaFGzy4",
  authDomain: "musicfy-dev-a95bf.firebaseapp.com",
  databaseURL: "https://musicfy-dev-a95bf.firebaseio.com",
  projectId: "musicfy-dev-a95bf",
  storageBucket: "musicfy-dev-a95bf.appspot.com",
  messagingSenderId: "199321719601",
  appId: "1:199321719601:web:5b8a80d112bad56dc65610",
};

export default firebase.initializeApp(firebaseConfig);
