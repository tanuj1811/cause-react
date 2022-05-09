import React from 'react'
import { useNavigate } from 'react-router-dom'
import './error.scss'

const Error = () => {
  const navigate = useNavigate()
  const goBackHandler = () => {
    navigate(-1)
  }
  return (
    <div className="error-page">
      <section class="notFound">
        <div class="img">
          <img
            className="go-back"
            onClick={goBackHandler}
            src="https://assets.codepen.io/5647096/backToTheHomepage.png"
            alt="Back to the Homepage"
          />
          <img
            src="https://assets.codepen.io/5647096/Delorean.png"
            alt="El Delorean, El Doc y Marti McFly"
          />
        </div>
        <div class="text">
          <h1>404</h1>
          <h2>PAGE NOT FOUND</h2>
          <h3 onClick={goBackHandler}>BACK TO HOME?</h3>
        </div>
      </section>
    </div>
  )
}

export default Error
