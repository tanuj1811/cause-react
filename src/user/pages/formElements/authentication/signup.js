import React, { useState, useContext } from 'react'
import { useForm } from '../../../../shared/hooks/form-hook'
import styles from './loginAndSignup.module.scss'
import { AccountContext } from './accountContext'
import Input from '../../../../shared/components/UIElements/Input'

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../../shared/util/validator'
import { useAuth } from '../../../../shared/context/authContext'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const navigate = useNavigate()
  const { switchToSignin } = useContext(AccountContext)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const { signup } = useAuth()

  const [formState, inputHandler] = useForm(
    {
      userName: { value: '', isValid: false },
      userEmail: { value: '', isValid: false },
      userPassword: { value: '', isValid: false },
    },
    false,
  )

  const signupSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      await signup(
        formState.inputs.userEmail.value,
        formState.inputs.userPassword.value,
        formState.inputs.userName.value,
      )
      navigate('/')
    } catch (error) {
      setError('Failed to create an account :(')
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <form className={styles.boxContainer} onSubmit={signupSubmitHandler}>
      {/* {currentUser && currentUser.email} */}
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.formContainer}>
        <Input
          className={styles.formContainer__input}
          id="userEmail"
          element="input"
          type="email"
          placeholder="Email"
          errText="Invalid Entered Text"
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
          ref={props.emailRef}
          // print={console.log(props.emailRef)}
        />
        <Input
          className={styles.formContainer__input}
          id="userName"
          element="input"
          type="text"
          placeholder="UserName"
          errText="Invalid Entered Text"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          ref={props.userNameRef}
        />
        <Input
          className={styles.formContainer__input}
          id="userPassword"
          element="input"
          type="password"
          placeholder="password"
          errText="Invalid Entered Text"
          validators={[VALIDATOR_MINLENGTH(8)]}
          onInput={inputHandler}
          ref={props.passwordRef}
        />
      </div>
      <span style={{ display: 'flex', height: '10px' }}></span>
      <button
        className={styles.submitButton}
        disabled={!formState.isValid}
        type="submit"
      >
        Signup
      </button>
      <span style={{ display: 'flex', height: '1em' }}></span>

      <a className={styles.mutedLink} href="#">
        Already have an account?{' '}
        <a className={styles.boldLink} href="#" onClick={switchToSignin}>
          Login
        </a>
      </a>
    </form>
  )
}

export default Signup
