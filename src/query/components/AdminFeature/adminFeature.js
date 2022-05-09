import React from 'react'
import { useNavigate } from 'react-router-dom'
import './adminFeatur.scss'
const AdminFeature = ({
  className,
  queryId,
  answer,
  deleteAnswer,
  deleteHandler,
  ...restProps
}) => {
  const navigate = useNavigate()
  const URL = `http://localhost:3000/${queryId}/query`

  const popUpMessage = (e) => {
    document.getElementById('custom-tooltip').style.display = 'inline'
    //document.execCommand("copy");
    setTimeout(function () {
      document.getElementById('custom-tooltip').style.display = 'none'
    }, 1000)
  }
  const featureHandler = (e) => {
    switch (e.target.name) {
      case 'edit-query':
        console.log('edit-query')
        navigate(`/queries/${queryId}/edit`)
        break
      case 'delete-query':
        deleteHandler()
        navigate(-1)
        break
      case 'edit':
        console.log('edit-answer')

        break
      case 'delete':
        deleteAnswer(answer._id)
        break
      case 'share':
        navigator.clipboard.writeText(URL)
        popUpMessage()
        break
      case 'post_answer':
        navigate('#post_answer')
        break

      default:
        break
    }
  }
  return (
    <div className={`adminFeatureComponent ${className}`}>
      {Object.entries(restProps).map((feature) => {
        return (
          <div className="feature">
            <button onClick={featureHandler} name={feature[1]}>
              {feature[0]}
            </button>
            <span id="custom-tooltip">copied!</span>
          </div>
        )
      })}
    </div>
  )
}

export default AdminFeature
