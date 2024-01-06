// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyDABPXg-j4W5h_VbD6_J7Ytm6LZdy7KNck",
   authDomain: "blog-522d3.firebaseapp.com",
   projectId: "blog-522d3",
   storageBucket: "blog-522d3.appspot.com",
   messagingSenderId: "523555200109",
   appId: "1:523555200109:web:744be050e6ba83ccca3364",
   measurementId: "G-56SVVR4RDL"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export { firebaseApp };
