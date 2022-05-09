import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './shared/context/authContext'

import Home from './user/pages/home'
import Navigation from './shared/components/Navigation/Header'
import styles from './index.scss'
import MainAuth from './user/pages/formElements/authentication/MainAuth'
import NewQuery from './query/pages/newQuery'
import AllQueries from './query/pages/AllQueries'
import Query from './query/pages/Query'
import Profile from './user/pages/Profile'
import EditQuery from './query/pages/editQuery/editQuery'
import EditProfile from './user/pages/formElements/EditProfile/editProfile'
import MainFooter from './shared/components/Footer/MainFooter'

const App = () => {
  return (
    <AuthProvider>
      <React.Fragment>
        <Router>
          <Navigation />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} exact={true} />
              <Route path="/query" element={<NewQuery />} exact={true} />
              <Route
                path="/queries/:queryId"
                element={<Query />}
                exact={true}
              />
              <Route path="/queries" element={<AllQueries />} exact={true} />
              <Route path="/auth" element={<MainAuth />} exact={true} />
              <Route path="/users/:userId" element={<Profile />} exact={true} />
              <Route
                path="/:userId/edit"
                element={<EditProfile />}
                exact={true}
              />
              <Route
                path="/queries/:queryId/edit"
                element={<EditQuery />}
                exact={true}
              />
            </Routes>
            {/* <Navigate to="/" element={<Home />} /> */}
          </main>
          <footer>
            <MainFooter />
          </footer>
        </Router>
      </React.Fragment>
    </AuthProvider>
  )
}

export default App
