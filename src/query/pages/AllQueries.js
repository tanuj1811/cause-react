import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AllQueriesList from '../components/AllQueriesList'

const BASE_URL = 'https://ca-use.herokuapp.com/api'

const AllQueries = () => {
  const [Queries, setQueries] = useState([])
  const AllQueries = () => {
    axios.get(`${BASE_URL}/queries`).then(
      (response) => {
        setQueries(response.data)
      },
      (error) => {
        console.log(error)
      },
    )
  }
  useEffect(() => {
    AllQueries()
  }, [])
  return (
    <React.Fragment>
      <AllQueriesList
        id="unsolvedqueries"
        heading="Unsolved Questions"
        queries={Queries}
      />
      <AllQueriesList
        id="topqueries"
        heading="Top Hashtag Questions"
        queries={Queries}
      />
      <AllQueriesList
        id="mostcommonquery"
        heading="Most Veiwed Questions"
        queries={Queries}
      />
    </React.Fragment>
  )
}

export default AllQueries
