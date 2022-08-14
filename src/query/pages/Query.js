import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useForm } from '../../shared/hooks/form-hook'
import { Button, Card, Input } from '../../shared/components/UIElements'

import './query.scss'
import Answer from '../components/Answer/answer'
import UserBox from '../../user/components/UserBox/userbox'
import Comment from '../components/Comment/comment'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from '../../shared/util/validator'
import AdminFeature from '../components/AdminFeature/adminFeature'
import { useAuth } from '../../shared/context/authContext'

const Query = () => {
  const currentQueryId = useParams().queryId
  const {currentUser} = useAuth();
  // console.log(currentUser)
  const [QUERY, setQUERY] = useState({})
  const [comment, setComment] = useState('')
  const [answer, setAnswer] = useState('')
  const [ANSWERS,setANSWERS] = useState([])
  const [COMMENTS,setCOMMENTS] = useState([])
  const [adminFeature,setAdminFeature] = useState({});


  useEffect(() => {
    axios
      .get(`https://ca-use.herokuapp.com/api/queries/${currentQueryId}`)
      .then(
        (response) => {
          setQUERY(response.data)
          setANSWERS(response.data.answers)
          setCOMMENTS(response.data.comments)
        },
        (error) => {
          console.log(error)
        },
      )

  })


  const [formState, inputHandler, setFormData] = useForm(
    {
      postAnswer: { value: '', isValid: false },
    },
    false,
  )

  const deleteQueryHandler = () => {
    // console.log('reached')
    axios.delete(`https://ca-use.herokuapp.com/api/queries/${QUERY._id}`).then(
      (response) => {
        console.log('query deleted from database' + QUERY._id)
      },
      (error) => console.log(error),
    )
  }
  const postAnswerHandler = (e) => {
    e.preventDefault()
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    var yyyy = today.getFullYear()

    let date = dd + '/' + mm + '/' + yyyy
    console.log(answer)
    const data = {
      answer: formState.inputs.postAnswer.value,
      userId: currentUser._id,
      date: date,
      queryId: currentQueryId,
      approved: false,
      score: 1,
    }
    axios
      .post(
        `https://ca-use.herokuapp.com/api/queries/${QUERY._id}/addAnswer`,
        data,
      )
      .then(
        (response) => {
          // loadQuery()
          setANSWERS([...ANSWERS, data])
          console.log('Answer added Successfully :)')
          setFormData(
            {
              postAnswer: { value: '', isValid: false },
            },
            false,
          )
          setAnswer('post answer')
        },
        (error) => {
          console.log(error)
        },
      )
  }
  const addCommentHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const data = {
        content: comment,
        userId: '625d8a7635f7113fc87ed5ff',
        queryId: QUERY._id,
      }
      axios
        .post(
          `https://ca-use.herokuapp.com/api/queries/${QUERY._id}/addComment`,
          data,
        )
        .then(
          (response) => {
            // loadQuery()
            setCOMMENTS([data, ...COMMENTS])
            console.log('Comment added Successfully :)')
          },
          (error) => {
            console.log(error)
          },
        )
      setComment('')
    }
  }

  const deleteAnswerHandler = (answerId) => {
    axios
      .delete(
        `https://ca-use.herokuapp.com/api/queries/${QUERY._id}/ans/${answerId}`,
      )
      .then(
        (response) => {
          console.log('answer deleted successfully ' + answerId)
          // loadQuery()
          setANSWERS((ANSWERS) => ANSWERS.filter((ans)=> ans._id !== answerId))
        },
        (error) => {
          console.log(error)
        },
      )
  }
  const deleteCommentHandler = (commentId) => {
    axios
      .delete(
        `https://ca-use.herokuapp.com/api/queries/${QUERY._id}/${commentId}`,
      )
      .then(
        (response) => {
          console.log('comment deleted successfully ' + commentId)
          // loadQuery()
          setANSWERS((COMMENTS) => COMMENTS.filter((cmt)=> cmt._id !== commentId))
        },
        (error) => {
          console.log(error)
        },
      )
  }

  useEffect(()=> {
    if(currentUser && currentUser._id === QUERY.userId) {
      setAdminFeature({
        edit:'edit-query',
        delete: 'delete-query'
      })
    }
  },[currentUser, QUERY])
  

  return (
    <>
      <Card className="container">
        <div className="tagsandquery">
          <div className="tags">
            <b>Tags: </b>
            {QUERY.tags && QUERY.tags.map((e) => <span>{e}</span>)}
          </div>
          <div className="tags">
            <b>Groups Mentioned: </b>
            {QUERY.groups && QUERY.groups.map((e) => <span>{e}</span>)}
          </div>
        </div>
        <div className="main_container">
          <h3>{QUERY.title}</h3>
          <div className="description">{QUERY.description}</div>
        </div>
        <AdminFeature
          className="adminFeature"
          queryId={QUERY._id}
          share='share'
          {...adminFeature}
          deleteHandler={deleteQueryHandler}
          post_answer
        />
        <UserBox date={QUERY.date} userId="queryhub1" className="userbox" />
        <hr />
        <div className="ansAndComments">
          <div className="answers">
            <h3>Answers</h3>
            {QUERY.answers &&
              QUERY.answers.map((ans) => (
                <Answer
                  answer={ans}
                  className="answer"
                  deleteAnswer={() => deleteAnswerHandler(ans._id)}
                />
              ))}
          </div>
          <div className="comments">
            <div className="add_comment">
              <input
                onKeyDown={addCommentHandler}
                type="input"
                className="add_comment_input"
                placeholder="Add a Comment"
                name="comment"
                id="add_comment_input"
                value={comment || ''}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            {QUERY.comments &&
              QUERY.comments.map((cmnt) => {
                return (
                  <Comment
                    className="comment"
                    comment={cmnt}
                    deleteCommentHandler={() => deleteCommentHandler(cmnt._id)}
                  />
                )
              })}
          </div>
        </div>
        <form
          id="post_answer"
          className="post-answer"
          onSubmit={postAnswerHandler}
        >
          <Input
            id="postAnswer"
            name="postAnswer"
            element="ckeditor"
            label="Post Answer"
            value={answer || ''}
            errText="Answer Range must be 20-500 words"
            row="15"
            validators={[VALIDATOR_MINLENGTH(20), VALIDATOR_MAXLENGTH(500)]}
            onInput={inputHandler}
          />
          <Button type="submit" inverse disabled={!formState.isValid}>
            Share Answer :)
          </Button>
        </form>
      </Card>
    </>
  )
}

export default Query
