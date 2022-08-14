import React, { useRef, useState } from 'react'
import {
  Button,
  Card,
} from '../../../../../shared/components/UIElements'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../../shared/context/authContext'

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions')
    } catch {
      setError('Failed to reset password')
    }

    setLoading(false)
  }

  return (
    <>
      <Card style={{ height: '80vh' }}>
        <div style={{
          width:'20rem',
          display:'flex',
          flexDirection:'column',
          backgroundColor:'whitesmoke',
          border:'1px solid black',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <p style={{backgroundColor:'tomato'}}>{error}</p>}
          {message && <p variant="success">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div id="email">
              <label>Email</label>
              <input type="email" ref={emailRef} required />
            </div>
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
          <div className="w-15 text-center mt-2 mb-3">
            Don't have an account <Link to="/auth">Sign Up</Link>
          </div>
        </div>
      </Card>
    </>
  )
}
