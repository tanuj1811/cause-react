import React, { useState, useEffect } from 'react'

import styles from './profile.module.scss'
import Card from '../../shared/components/UIElements/Card'
import EmptySpace from '../../shared/components/UIElements/EmptySpace'
import AllQueriesList from '../../query/components/AllQueriesList'
import { Error } from '../../shared/components/UIElements'
import { Users } from '../components/Fetching/user'
import { Link, useParams } from 'react-router-dom'
import { Answers, Queries } from '../../query/components/Fetching/Queries'
import { useAuth } from '../../shared/context/authContext'
import axios from 'axios'
import { async } from '@firebase/util'
const Profile = () => {
  const [userId, setUserId] = useState(useParams().userId)
  const [USER, setUser] = useState({})
  const [recentQueries, setRecentQueries] = useState([])

  useEffect(() => {
    // setUserId(useParams().userId)
    if (!userId) return <Error message={'not found'} />
    axios.get(`https://ca-use.herokuapp.com/api/users/${userId}`).then(
      (response) => setUser(response.data),
      (error) => console.log(error),
    )
  })

  useEffect(() => {
    if (USER.questions) {
      const questions = USER.questions
      for (var i = 0; i < 5 && i < questions.length; i++) {
        setRecentQueries([...recentQueries, questions[i]])
      }
      console.log(recentQueries)
    }
  }, [USER])

  return (
    <div>
      <Card className={styles.profile__main}>
        {/* <div className={styles.profile__user}> */}
        <div className={styles.profile__dp}>
          <img
            src={USER.profilePic}
            alt="Admin"
            className="rounded-circle"
            width="150"
          />
        </div>
        <div className={styles.vertical__line}></div>
        <div className={styles.profile__name}>
          <h1>{`${USER._id}#${USER.role}`}</h1>
          <EmptySpace height="30px" />
          <div className={styles.profile__main__info}>
            <div>
              <h3>
                <strong>Name:</strong>
              </h3>
              {USER.name}
            </div>
            <div>
              <h3>
                <strong>Profession:</strong>
              </h3>
              {USER.profession}
            </div>
          </div>
          <hr />
          <p>
            <strong>me: </strong>
            {USER.description}
          </p>
          <hr />
          <div className={styles.profile__work}>
            <h3>Links:</h3>
            {USER.otherContactLink &&
              Object.entries(USER.otherContactLinks).map((user) => (
                <Link to={user[1]}>{user[0]}</Link>
              ))}
          </div>
        </div>
        {/* </div> */}
      </Card>
      <div className={styles.profile__stats}>
        <Card className={styles.profile__stats__stats}>
          <h2>Stats</h2>
          <EmptySpace height="30px" />

          <div className={styles.profile__stats__stats__info}>
            {USER.stats &&
              Object.entries(USER.stats).map((s) => {
                return (
                  <div style={{ padding: '20px' }}>
                    <h5>
                      <strong>{`${s[0]}: `}</strong>
                    </h5>
                    {s[1]}
                  </div>
                )
              })}
          </div>
        </Card>
        <Card className={styles.profile__stats__stats}>
          <h2>Respects In:</h2>
          <EmptySpace height="20px" />
          <p style={{ padding: '10px' }}>
            <strong>groups:</strong>Query Hub
          </p>{' '}
          <hr />
          <p style={{ padding: '10px' }}>
            <strong>tech market:</strong>Query Hub
          </p>{' '}
          <hr />
          <p style={{ padding: '10px' }}>
            <strong>cause:</strong>Query Hub
          </p>{' '}
          <hr />
          <p style={{ padding: '10px' }}>
            <strong>other sites:</strong>Query Hub
          </p>
        </Card>
        <div className={styles.profile__stats__row}>
          <Card className={styles.profile__stats__tags}>
            <h2>Specialization In:</h2>
            <EmptySpace height="20px" />
            <div className={styles.profile__stats__tags__skills}>
              {USER.specialization &&
                USER.specialization.map((s) => <span>{s}</span>)}
            </div>
          </Card>
          <Card className={styles.profile__stats__tags}>
            <h2>Other Platform In:</h2>
            <EmptySpace height="20px" />
            <div className={styles.profile__stats__tags__skills}>
              {USER.otherPlatformLinks &&
                Object.entries(USER.otherPlatformLinks).map((p) => (
                  <span>
                    <Link to={p[1]}>{p[0]}</Link>
                  </span>
                ))}
            </div>
          </Card>
        </div>
      </div>
      <Card className={styles.profile__main__lists}>
        <h2>Recents Queries:</h2>
        <EmptySpace height="20px" />
        <div className={styles.profile__main__lists__list}>
          {USER.questions &&
            USER.questions.map((rc) => {
              return (
                <>
                  <h3>{rc.title}</h3>
                  <hr />
                  <p>date:{rc.date} || time : 8:00</p>
                </>
              )
            })}
        </div>
      </Card>
    </div>
  )
}

export default Profile
