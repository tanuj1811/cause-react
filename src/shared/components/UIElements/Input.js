import React, { useReducer, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-built-custom/build/ckeditor'
import { validate } from '../../util/validator'
import './Input.css'

const InputReducer = (state, action) => {
  if (action.type === 'CHANGE') {
    return {
      ...state,
      value: action.val,
      isValid: validate(action.val, action.validators),
    }
  } else if (action.type === 'TOUCH') {
    return {
      ...state,
      isTouch: true,
    }
  }
  return state
}
const Input = (props) => {
  const [inputState, dispatch] = useReducer(InputReducer, {
    value: props.value || '',
    isValid: props.valid || false,
    isTouch: false,
  })

  const { id, onInput } = props
  const { value, isValid } = inputState
  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput])

  const InputHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    })
  }
  const RichTextInputHandler = (data) => {
    dispatch({
      type: 'CHANGE',
      val: data,
      validators: props.validators,
    })
  }
  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    })
  }
  const editorConfig = {
    toolbar: [
      'bold',
      'italic',
      'autoformat',
      'blockQuote',
      'code',
      'image',
      'underline',
      'codeBlock',
    ],
  }
  const element =
    props.element === 'input' ? (
      <input
        className={props.className}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={InputHandler}
        onBlur={touchHandler}
        value={inputState.value || props.value}
      />
    ) : props.element === 'textarea' ? (
      <textarea
        className={props.className}
        id={props.id}
        placeholder={props.placeholder}
        rows={props.row || 3}
        onChange={InputHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <CKEditor
        editor={Editor}
        config={editorConfig}
        data={`<p>${props.value}</p>`}
        // onReady={(editor) => {
        //   // You can store the "editor" and use when it is needed.
        //   console.log('Editor is ready to use!', editor)
        // }}
        onChange={(event, editor) => RichTextInputHandler(editor.getData())}
        onBlur={touchHandler}
        onInput={(event, editor) => console.log('editor.getData()')}
        // onFocus={(event, editor) => {
        //   console.log('Focus.', editor)
        // }}
      />
    )
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouch && 'form-control--invalid'
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouch && <p>{props.errText}</p>}
    </div>
  )
}

export default Input
