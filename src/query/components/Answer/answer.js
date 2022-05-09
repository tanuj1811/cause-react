import React, { useState, useEffect } from 'react'
import './answer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faHeart } from '@fortawesome/free-solid-svg-icons'
// import { faCheckCircle } from '@fortawesome/fontawesome-free-regular'
import UserBox from '../../../user/components/UserBox/userbox'
import { Card } from '../../../shared/components/UIElements'
import AdminFeature from '../AdminFeature/adminFeature'
const Answer = ({ answer, className, deleteAnswer, ...restProps }) => {
  const ans = answer

  const [approved, setApproved] = useState(ans.approved)

  useEffect(() => {
    ans.approved = approved
    ans.score += approved ? -1 : 1
  }, [approved])

  return (
    <Card className={`${className} answerComponent`}>
      {/* <div className="approved"> */}
      <button onClick={() => setApproved(!approved)}>
        {approved && <FontAwesomeIcon icon={faCheckCircle} />}
        {!approved && <FontAwesomeIcon icon={faHeart} />}
        <span>{ans.score}</span>
      </button>

      <div className="content">
        <p>{ans.answer}</p>
        <div>
          <AdminFeature
            edit="edit-answer"
            delete="delete"
            answer={ans}
            deleteAnswer={() => deleteAnswer(ans._id)}
          />
          <UserBox className="userbox" date={ans.date} userId="queryhub1" />
        </div>
      </div>

      {/* </div> */}
    </Card>
  )
}

export default Answer
