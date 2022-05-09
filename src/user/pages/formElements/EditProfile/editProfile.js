import React from 'react'
import { useAuth } from '../../../../shared/context/authContext'

const EditProfile = () => {
  const { currentUser } = useAuth()
  console.log(currentUser)
  return <div>{JSON.stringify(currentUser)}</div>
}

export default EditProfile
