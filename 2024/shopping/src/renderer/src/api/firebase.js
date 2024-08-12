// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

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
googleProvider.setCustomParameters({ prompt: 'select_account' })

// google oauth login
export function login() {
  signInWithPopup(auth, googleProvider)
    .then(result => {
      const user = result.user
      console.log(user)
      // return user
    })
    .catch(error => {
      console.log(error)
    })
}

// logout
export function logout() {
  signOut(auth).then(() => {
    console.log('logout')
    console.log(auth)
    return null
  })
}

/**
 * - 동작 순서
 * 1. 컴포넌트 마운트
 * 2. useEffect 동작
 * 3. onUserStateChanged 호출하면서 인자로 (user) => setUser(user) 콜백함수 전달
 * 4. onAuthStateChanged 호출
 * 5. onAuthStateChanged가 로그인 상태를 확인해 user객체 또는 null값을 가져옴
 * 6. 확인된 user객체 또는 null값을 callback함수인 (user) => setUser(user)의 인자에 전달
 * 7. setUser(user)에 user객체 또는 null값이 대입됨
 */
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, user => {
    callback(user) // user가 있으면 user, 없으면 null -> onUserStateChange의 callback으로 전달
  })
}
