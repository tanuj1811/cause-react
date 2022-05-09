import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import axios from 'axios'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password, username) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
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
            portfolio: 'https://cause.com',
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
            freq: 100,
          },
          questions: [],
        }
        axios.post('https://ca-use.herokuapp.com/api/users/addUser', data).then(
          (response) => {
            console.log('user added at both end')
          },
          (error) => console.log(error),
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function login(email, password) {
    return await signInWithEmailAndPassword(auth, email, password).then(
      (userCred) => {
        console.log(userCred.user)
        axios
          .get(`https://ca-use.herokuapp.com/api/users/${userCred.user.uid}`)
          .then(
            (response) => setCurrentUser(response.data),
            (error) => console.log(error),
          )
      },
      (error) => console.log(error),
    )
  }

  function logout() {
    console.log('logout')
    setCurrentUser(null)
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        axios.get(`https://ca-use.herokuapp.com/api/users/${user.uid}`).then(
          (response) => setCurrentUser(response.data),
          (error) => console.log(error),
        )
      }
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
    updateEmail,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
