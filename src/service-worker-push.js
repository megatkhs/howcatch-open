import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCFHl3YaABALoIEovx69kqjjqZ38nKu8sI",
  authDomain: "howcatch-dev.firebaseapp.com",
  databaseURL: "https://howcatch-dev.firebaseio.com",
  storageBucket: "howcatch-dev.appspot.com",
};
firebase.initializeApp(config);

console.log(firebase)