import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../shared/hooks/form-hook'
import { useAuth } from '../../shared/context/authContext'

import styles from './newQuery.module.scss'
import Input from '../../shared/components/UIElements/Input'
import Button from '../../shared/components/UIElements/Button'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from '../../shared/util/validator'
import axios from 'axios'
import { AiOutlineClose } from 'react-icons/ai'

const NewQuery = (props) => {
  const {currentUser} = useAuth();
  const navigate = useNavigate()
  const query = props.query || {}
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState(query.tags || [])
  const [tagIsValid, setTagIsValid] = useState(true)
  const [formState, inputHandler] = useForm(
    {
      title: { value: query.title || '', isValid: false },
      description: {
        value: query.description || '',
        isValid: false,
      },
      groups: {
        value: query.groups || '',
        isValid: true,
      },
    },
    false,
  )
  const formHandler = (e) => {
    e.preventDefault()
    let data = {
      userId: currentUser._id,
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      groups: query.groups || [],
      tags: tags || query.tags,
      answers: query.answers || [],
      comments: query.comments || [],
      likes: query.likes || 0,
    }
    console.log(data)
    if (props.type === 'update') {
      axios
        .post(
          `https://ca-use.herokuapp.com/api/queries/${query._id}/updateQuery`,
          data,
        )
        .then(
          (response) => {
            console.log('Updated question' + query._id)
            navigate(-1)
          },
          (error) => console.log(error),
        )
    } else {
      axios
        .post(`https://ca-use.herokuapp.com/api/queries/newQuery`, data)
        .then(
          (response) => {
            console.log('new query added successfully to your database')
            navigate('/queries')
          },
          (error) => console.log(error),
        )
    }
  }

  const tagValidation = (tags_length) => {
    setTagIsValid(tags_length > 0 && tags_length < 6)
  }
  const deleteTagHandler = (t) => {
    let newTags = tags.filter((ta) => ta !== t)
    setTags(newTags)
    tagValidation(newTags.length)
  }

  const tagsHandler = (e) => {
    if (e.key === 'Enter' && tag !== '' && tags.indexOf(tag) === -1) {
      console.log(tags.indexOf(tag))
      setTags([...tags, tag])
      tagValidation(tags.length + 1)
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
        <Input
          id="title"
          name="title"
          element="input"
          type="text"
          label="Title"
          value={query.title || ''}
          placeholder="Enter Title of Place"
          errText="Ivnalid Entered Text"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(150)]}
          onInput={inputHandler}
        />

        <Input
          id="description"
          name="description"
          element="ckeditor"
          label="Description"
          value={query.description || ''}
          errText="Ivnalid Entered Text"
          row="15"
          validators={[VALIDATOR_MINLENGTH(20), VALIDATOR_MAXLENGTH(500)]}
          onInput={inputHandler}
        />
        <Input
          id="groups"
          name="groups"
          element="input"
          type="text"
          value=""
          label="Mentions the Groups"
          placeholder=""
          errText="Max. 5 groups is allowed"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <div className={styles.tags}>
          {tags &&
            tags.map((t) => (
              <div onClick={() => deleteTagHandler(t)}>
                {t}{' '}
                <AiOutlineClose
                  style={{ color: 'black', margin: 'auto', marginLeft: '5px' }}
                />
              </div>
            ))}
        </div>
        <b className={styles.tag_invalid}>Tags : </b>
        <input
          id="tags"
          className={styles.tag_input}
          onKeyDown={tagsHandler}
          onChange={(e) => setTag(e.target.value)}
          value={tag}
        />
        <p style={{ color: 'red' }}>
          {!tagIsValid ? 'try to insert some valuable tags' : ''}
        </p>

        {/* <div>
          <label className="col-sm-2 col-form-label">Have Image?</label>
          <input
            name="imgURL"
            type="file"
            className="custom-file-input pading"
            id="customFile"
            placeholder="Select Image"
          />
          <label className="col-sm-2 col-form-label">(upto 5MB only)</label>
        </div> */}
        <Button type="submit" disabled={!formState.isValid || tags.length <= 0}>
          Submit
        </Button>
      </form>
    </div>
    // </div>
  )
}

export default NewQuery
