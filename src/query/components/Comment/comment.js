import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './comment.scss'

const Comment = (props) => {
  const cmnt = props.comment
  if (cmnt == null)
    cmnt = {
      _id: '',
      content: '',
      userId: '',
      queryId: '',
    }

  return (
    <div className={`${props.className} commentComponent`}>
      <div className="content">
        <p>{cmnt.content}</p>
        <div className="trash-icon">
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => props.deleteCommentHandler(cmnt._id)}
          />
        </div>
      </div>

      <hr />
    </div>
  )
}

export default Comment
