import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Queries } from '../../components/Fetching/Queries'
import NewQuery from '../newQuery'
import axios from 'axios'

const EditQuery = () => {
  const currentQueryId = useParams().queryId
  const [QUERY, setQUERY] = useState({})
  useEffect(() => {
    axios
      .get(`https://ca-use.herokuapp.com/api/queries/${currentQueryId}`)
      .then(
        (response) => {
          setQUERY(response.data)
        },
        (error) => {
          console.log(error)
        },
      )
  }, [])
  return <NewQuery query={QUERY} type="update" />
}

export default EditQuery
