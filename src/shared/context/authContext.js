import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth'
import axios from 'axios'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function signup(email, password, username) {
    return await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user
        console.log(user.uid)
        let data = {
          _id: user.uid,
          name: username,
          email: email,
          profession: String(''),
          description: String('Hey! i start using cause.com'),
          password: password,
          score: 0,
          profilePic: 'https://bootdey.com/img/Content/avatar/avatar7.png',
          role: 'user',
          specialization: [
            'account creating',
            'opening account in awesome sites',
          ],
          otherContractLinks: {
            portfolio: 'https://cause-one.vercel.app/users' + user.uid,
            resume: '',
            linkedin: '',
            github: '',
            discord: '',
          },
          otherPlatformLinks: {
            codeforces: '',
            codechef: '',
            leetcode: '',
            atCoders: '',
          },
          stats: {
            Asked: 0,
            answers: 0,
            groupsJoined: 0,
            freq: 1,
          },
          questions: [],
        }
        axios
          .post('https://ca-use.herokuapp.com/api/users/addUser', data)
          .then((response) => {
            console.log('user added at both end')
            setCurrentUser(response.data)
          })
      },
    )
  }

  async function login(email, password) {
    // return await signInWithEmailAndPassword(auth, email, password).then((response)=> console.log(response.user.uid))
    return await signInWithEmailAndPassword(auth, email, password).then(
      (userCred) => {
        axios
          .get(`https://ca-use.herokuapp.com/api/users/${userCred.user.uid}`)
          .then((response) => setCurrentUser(response.data))
      },
    )
  }

  function logout() {
    setCurrentUser(null)
    return auth.signOut()
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
