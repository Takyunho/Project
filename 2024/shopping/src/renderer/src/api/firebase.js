// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

// google oauth login
export function login() {
  signInWithPopup(auth, googleProvider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      // console.log(credential)
      // const token = credential.accessToken
      // The signed-in user info.
      const user = result.user
      console.log(user)
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch(error => {
      console.log(error)
      // Handle Errors here.
      // const errorCode = error.code
      // const errorMessage = error.message
      // The email of the user's account used.
      // const email = error.customData.email
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })
}
googleProvider.setCustomParameters({ prompt: 'select_account' })
