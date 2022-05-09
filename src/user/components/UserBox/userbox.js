import React from 'react'

import './userbox.scss'
import User from '../Fetching/user'
import { Answers } from '../../../query/components/Fetching/Queries'
import { Link } from 'react-router-dom'
import { Card } from '../../../shared/components/UIElements'

const UserBox = (props) => {
  const user = User.find((u) => u._id === props.userId)
  // console.log(user)
  return (
    <Card className={`${props.className} userBoxComponent`}>
      <div className="user-action-time">
        posted at: <b>{props.date}</b> by :
      </div>
      <div className="user-details">
        <img src={user.profilePic} alt="dp" />
        <Link to={`/users/${user._id}`}>
          <p>{user.name}</p>
          <div className="details">
            <p>{`${user.score}  ${user.stats.freq}  ${user.stats.groupsJoined}`}</p>
          </div>
        </Link>
      </div>
    </Card>
  )
}

export default UserBox
