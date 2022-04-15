// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
//importScripts('https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.js')
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyDwAZh5bAxiTPoklSeDavapYExJxsKrFyM",
    authDomain: "mbuybani.firebaseapp.com",
    projectId: "mbuybani",
    storageBucket: "mbuybani.appspot.com",
    messagingSenderId: "68872485867",
    appId: "1:68872485867:web:95c498f8951e0cfdeb77ae",
    measurementId: "G-6V8GFD4K46"
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// async function addpush(name, data) {
//     try {

//         const name_data = await localforage.getItem(name);
//         if (name_data) {
//             const json = JSON.parse(name_data);
//             json.push(data)
//             const getdata = await localforage.setItem(name, JSON.stringify(json));
//             return JSON.parse(getdata)

//         } else {
//             const getdata = await localforage.setItem(name, JSON.stringify([data]));
//             return JSON.parse(getdata)
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
// async function gg() {
//     console.log(await addpush('gg', {
//         id: 333
//     }))
// }
// gg()
const messaging = firebase.messaging();
messaging.onBackgroundMessage(async(payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = payload.notification;
    self.registration.showNotification(notificationTitle, notificationOptions);
});