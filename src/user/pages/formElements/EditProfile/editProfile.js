import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../../../shared/hooks/form-hook'
import { useAuth } from '../../../../shared/context/authContext'

import styles from './editProfile.module.scss'
import Input from '../../../../shared/components/UIElements/Input'
import Button from '../../../../shared/components/UIElements/Button'
import { VALIDATOR_MAXLENGTH } from '../../../../shared/util/validator'
import axios from 'axios'
import { AiOutlineClose } from 'react-icons/ai'

const EditProfile = (props) => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [tag, setTag] = useState('')
  const [specialization, setSpecialization] = useState(
    currentUser.specialization,
  )
  const inputs = [
    'name',
    'profession',
    'description',
    'dp',
    'resume',
    'linkedin',
    'github',
    'discord',
    'codeforces',
    'codechef',
    'leetcode',
    'atCoders',
  ]

  const [formState, inputHandler] = useForm(
    {
      name: { value: currentUser.name, isValid: true },
      profession: { value: currentUser.profession, isValid: true },
      description: { value: currentUser.description, isValid: true },
      dp: { value: currentUser.profilePic, isValid: true },
      resume: { value: currentUser.resume, isValid: true },
      linkedin: { value: currentUser.linkedin, isValid: true },
      github: { value: currentUser.github, isValid: true },
      discord: { value: currentUser.discord, isValid: true },
      codeforces: { value: currentUser.codeforces, isValid: true },
      codechef: { value: currentUser.codechef, isValid: true },
      leetcode: { value: currentUser.leetcode, isValid: true },
      atCoders: { value: currentUser.atCoders, isValid: true },
    },
    true,
  )

  const formHandler = (e) => {
    e.preventDefault()
    let data = {
      name: formState.inputs.name.value,
      email: currentUser.email,
      profession: formState.inputs.profession.value,
      description: formState.inputs.description.value,
      password: currentUser.password,
      score: currentUser.score,
      profilePic: formState.inputs.dp.value || currentUser.profilePic,
      role: currentUser.role,
      specialization: specialization,
      otherContractLinks: {
        portfolio: 'https://cause-one.vercel.app/users' + currentUser._id,
        resume: formState.inputs.resume.value,
        linkedin: formState.inputs.linkedin.value,
        github: formState.inputs.github.value,
        discord: formState.inputs.discord.value,
      },
      otherPlatformLinks: {
        codeforces: formState.inputs.codeforces.value,
        codechef: formState.inputs.codechef.value,
        leetcode: formState.inputs.leetcode.value,
        atCoders: formState.inputs.atCoders.value,
      },
      stats: currentUser.stats,
      questions: currentUser.questions,
    }
    console.log(data)
    axios
      .post(
        `https://ca-use.herokuapp.com/api/users/${currentUser._id}/updateUser`,
        data,
      )
      .then(
        (response) => {
          console.log('user is updated successfully')
          navigate(-1)
        },
        (error) => console.log(error),
      )
  }

  const deleteTagHandler = (t) => {
    setSpecialization((specialization) =>
      specialization.filter((ta) => ta != t),
    )
  }

  const tagsHandler = (e) => {
    if (e.key === 'Enter' && tag !== '' && specialization.indexOf(tag) === -1) {
      console.log(specialization.indexOf(tag))
      setSpecialization([...specialization, tag])
    }
    if (e.key === 'Enter') setTag('')
  }

  return (
    // <div className={styles.formWithBackground}>
    <div className={styles.form__container}>
      <div className={styles.heading_container}>
        <h2>Ask your Query</h2>
        <img
          src="https://cdn.sstatic.net/Img/ask/background.svg?v=2e9a8205b368"
          alt="images"
        />
      </div>
      <form className={styles.placeForm} onSubmit={formHandler}>
        {currentUser &&
          inputs.map((input) => {
            return (
              <Input
                className={styles.input}
                key={input}
                id={input}
                name={input}
                element="input"
                type="text"
                label={input==='dp'?'Profile pic URL': input.toUpperCase()}
                value={currentUser[input] || ''}
                placeholder="Enter your detail here"
                errText="Invalid Entered Text"
                validators={[VALIDATOR_MAXLENGTH(150)]}
                onInput={inputHandler}
              />
            )
          })}
        <div className={styles.tags}>
          {specialization &&
            specialization.map((t) => (
              <div onClick={() => deleteTagHandler(t)}>
                {t}{' '}
                <AiOutlineClose
                  style={{ color: 'black', margin: 'auto', marginLeft: '5px' }}
                />
              </div>
            ))}
        </div>
        <b className={styles.tag_invalid}>Specialization : </b>
        <input
          id="specialization"
          className={styles.tag_input}
          onKeyDown={tagsHandler}
          onChange={(e) => setTag(e.target.value)}
          value={tag}
        />

        <Button type="submit" disabled={formState.isValid}>
          {'Update :-)'}
        </Button>
      </form>
    </div>
    // </div>
  )
}

export default EditProfile
