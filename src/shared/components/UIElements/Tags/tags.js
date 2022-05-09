import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import './tags.scss'
const Tags = ({ ...restProps }) => {
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([])
  const tagValidation = (tags_length) => {
    setTagIsValid(tags_length > 0 && tags_length < 6)
  }
  const [tagIsValid, setTagIsValid] = useState(true)
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
    <div>
      <div className="tags">
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
      <b className="tag_invalid">Tags : </b>
      <input
        id="tags"
        className="tag_input"
        onKeyDown={tagsHandler}
        onChange={(e) => setTag(e.target.value)}
        value={tag}
      />
      <p style={{ color: 'red' }}>
        {!tagIsValid ? 'try to insert valuable tags' : ''}
      </p>
    </div>
  )
}

export default Tags
