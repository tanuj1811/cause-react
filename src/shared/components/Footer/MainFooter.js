import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './footer.scss'
import {
  faGithub,
  faTelegram,
  faDiscord,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'

const MainFooter = () => {
  return (
    <div class="footer-basic">
      <footer>
        <div class="social">
          <a href="https://github.com/tanuj1811/cause">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://instagram.com/">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://telegram.com/">
            <i class="icon ion-social-twitter"></i>
            <FontAwesomeIcon icon={faTelegram} />
          </a>
          <a href="https://discord.com/">
            <FontAwesomeIcon icon={faDiscord} />
          </a>
        </div>
        <ul class="list-inline">
          <li class="list-inline-item">
            <a href="/">Home</a>
          </li>
          <li class="list-inline-item">
            <a href="#">Services</a>
          </li>
          <li class="list-inline-item">
            <a href="#">About</a>
          </li>
          <li class="list-inline-item">
            <a href="#">Terms</a>
          </li>
          <li class="list-inline-item">
            <a href="#">Privacy Policy</a>
          </li>
        </ul>
        <p class="copyright">cause.com © 2022</p>
      </footer>
    </div>
  )
}

export default MainFooter
