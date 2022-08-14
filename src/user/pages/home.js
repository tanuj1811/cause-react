import React, { useState, useEffect } from 'react'

import styles from './home.module.scss'
import { useNavigate } from 'react-router-dom'
// import stylesVariable from '../../shared/SassVariables/variable.scss'
import Jumbotron from '../../shared/components/UIElements/Jumbotron'
import Card from '../../shared/components/UIElements/Card'
import axios from 'axios'

const Home = () => {
  const [totalQues, setTotalQues] = useState(0)
  const [tags] = useState(['java','python','english','react','node','spring boot'])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('https://ca-use.herokuapp.com/api/queries').then(
      (response) => {
        if (response.data) setTotalQues(response.data.length)
      },
      (error) => console.log(error),
    )
  })

  return (
    <React.Fragment>
      <Jumbotron height="fit-content" width="92%" curve="curve" stackOverFlow>
        <div className={styles.home__jumbotron2}>
          <Jumbotron
            height="fit-content"
            button="Join the community"
            to="/login"
            mainText="Join our Communtity"
            subText="Get the best answer to your technical questions, help others answer theirs"
            backgroundColor="lightsalmon"
          />
          <Jumbotron
            height="fit-content"
            button="Join the devps Community"
            to="/"
            mainText="Contribute to our code"
            subText="Improve the site perfornmace with contribute to our code via github"
            backgroundColor="rgb(150, 235, 150)"
          />
        </div>
        <div className={styles.jumbotron__text}>
          <h1> Yours every Doubt needs answer</h1>
        </div>

        <div>
          <ul className={styles.home__displayQues}>
            <li>
              <h3>Total Queries</h3> <p>{totalQues}</p>
            </li>
            <li>
              <h3>Pending Queries</h3> <p>{265}</p>
            </li>
            <li>
              <h3>Avg. response Time</h3> <p>30 min</p>
            </li>
            <li>
              <h3>active Users</h3>{' '}
              <p>{Math.floor((Math.random() + 1) * 15)}</p>
            </li>
          </ul>
        </div>
      </Jumbotron>
      <div className={styles.home__card__div}>
        <Card className={styles.home__card}>
          <h1>A Thanks to our contributor's</h1>
          <div className={styles.tags}>
          <div onClick={() => {navigate('/users/mNg2A63RS3bK8c9FlhQYy6VbQD23')}}>
                {'tanuj sharma'}{' '}
              </div>
        </div>
        </Card>
        <Jumbotron
          height="fit-content"
          button="Read More"
          to="/"
          mainText="About Query-Point"
          subText=""
          backgroundColor="rgb(150, 235, 150)"
        />
      </div>
      <div>
        <h1 style={{ color: 'white', margin: '1rem' }}>Trending Tags</h1>
        <div className={styles.home__trend__card}>
          <div className={styles.tags}>
          {tags &&
            tags.map((t) => (
              <div onClick={() => {navigate('/queries')}}>
                {t}{' '}
              </div>
            ))}
        </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
