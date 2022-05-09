import React, { useContext, useState } from 'react'

import { useForm } from '../../../../shared/hooks/form-hook'

import styles from './loginAndSignup.module.scss'
import { AccountContext } from './accountContext'
import Input from '../../../../shared/components/UIElements/Input'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../../../shared/util/validator'
import { useAuth } from '../../../../shared/context/authContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const { switchToSignup } = useContext(AccountContext)
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const [formState, inputHandler] = useForm(
    {
      userEmail: { value: '', isValid: false },
      userPassword: { value: '', isValid: false },
    },
    false,
  )

  const loginSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      await login(
        formState.inputs.userEmail.value,
        formState.inputs.userPassword.value,
      )
      navigate(-1)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  return (
    <form className={styles.boxContainer} onSubmit={loginSubmitHandler}>
      <div className={styles.formContainer}>
        {error && <div className={styles.error}>{error}</div>}
        <Input
          className={styles.formContainer__input}
          id="userEmail"
          element="input"
          type="email"
          placeholder="Email"
          errText="Invalid Entered Text"
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
        />
        <Input
          className={styles.formContainer__input}
          id="userPassword"
          element="input"
          type="password"
          placeholder="Password"
          errText="Invalid Entered Text"
          validators={[VALIDATOR_MINLENGTH(3)]}
          onInput={inputHandler}
        />
      </div>
      <span style={{ display: 'flex', height: '10px' }}></span>
      <a className={styles.mutedLink} href="">
        Forget your password ?
      </a>
      <span style={{ display: 'flex', height: '1.6em' }}></span>
      <button
        className={styles.submitButton}
        disabled={loading && !formState.isValid}
        type="submit"
      >
        Signin
      </button>
      <span style={{ display: 'flex', height: '1em' }}></span>

      <a className={styles.mutedLink} href="#">
        Don't have an account?{' '}
        <a className={styles.boldLink} href="#" onClick={switchToSignup}>
          Signup
        </a>
      </a>
    </form>
  )
}

export default Login
