import * as firebase from 'firebase/app'
import "firebase/storage";
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.VUE_APP_apiKey,
    authDomain: process.env.VUE_APP_authDomain,
    databaseURL: process.env.VUE_APP_databaseURL,
    projectId: process.env.VUE_APP_projectId,
    storageBucket: process.env.VUE_APP_storageBucket,
    messagingSenderId: process.env.VUE_APP_messagingSenderId,
    appId: process.env.VUE_APP_appId,
    measurementId: process.env.VUE_APP_measurementId,
};

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const playlistsCollection = db.collection('playlists')


export { firebase, storage, db, auth, playlistsCollection }