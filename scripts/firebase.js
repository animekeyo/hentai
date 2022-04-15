// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { GoogleAuthProvider, getAuth, signInWithRedirect, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-check.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js";
//import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBO4TTTG9xxhalvgu0FuSL_pmfi1KGOdGA",
    authDomain: "buybannni.firebaseapp.com",
    databaseURL: "https://buybannni-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "buybannni",
    storageBucket: "buybannni.appspot.com",
    messagingSenderId: "218687110534",
    appId: "1:218687110534:web:b5345d7c9bd87224e70007",
    measurementId: "G-7KP67FGE4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Ldi8EIfAAAAABHL1imjArpA_XwBeMLoFmngVjk4'),
    isTokenAutoRefreshEnabled: true
});
const analytics = getAnalytics(app);

//https://firebase.google.com/docs/cloud-messaging/js/client
const messaging = getMessaging(app);
// Add the public key generated from the console here.

getToken(messaging, { vapidKey: "BDBZ3dmoUnTCjl1Y5W8vF7Fi35aALdVfNHfJHlhDpQWAvjAZCL0Xae4j_7_rRgglKEbXqysF6-9fmehknAzbNdw" }).then((currentToken) => {
    if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        console.log(currentToken)
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});
onMessage(messaging, async(payload) => {
    const g = payload.notification;
    $('body').append('<noti></noti>')
    await element('element/notification', [{
        title: g.title,
        decs: g.body,
        icon: 'check_circle',
        color: 'green',
        time: Date.now()
    }], 'noti')
});
const provider = new GoogleAuthProvider();
const auth = getAuth();
const actionCodeSettings = {
    url: 'http://127.0.0.1/',
    handleCodeInApp: true,
};


onAuthStateChanged(auth, (user) => {
    const url = window.location.href;
    if (user) {
        console.log(user)
        setii('displayName', user.displayName);
        setii('avatar', user.photoURL);
        setii('email', user.email);
        if (url.indexOf('welcome') > -1) {
            window.location.href = '/shop/';
        }
    } else {
        if (url.indexOf('welcome') > -1) {} else {
            window.location.href = '/welcome';
        }
    }
});
$(document).on('click', '.login', function() {
    signInWithRedirect(auth, provider);
})
$(document).on('click', '.emailG', function() {
    signInWithEmailAndPassword(auth, 'buybanni@gmail.com', $('input').val())
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
})