// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBgMeSlV7RXKNx8fOmq-ewRejugs5yh93E',
  authDomain: 'cause-3f666.firebaseapp.com',
  projectId: 'cause-3f666',
  storageBucket: 'cause-3f666.appspot.com',
  messagingSenderId: '989164909111',
  appId: '1:989164909111:web:e5235002cdbe2bd86205b2',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app
