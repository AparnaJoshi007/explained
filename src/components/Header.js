import React from 'react'
import { Link } from 'gatsby'
import config from '../../data/SiteConfig'
import styles from './Header.module.scss'

const Header = () => (
  <header>
    <h1>
      <Link to="/" activeClassName={styles.activeNav}>
        <img src={config.siteNameLogo.replace("static", "")} alt="explained" />
      </Link>
    </h1>
    <nav>
      <ul className={styles.mainNav}>
        <li>
          <Link to="/about" activeClassName={styles.activeNav}>
            Know me
          </Link>
        </li>
        <li>
          <Link to="/blog" activeClassName={styles.activeNav}>
            Blog
          </Link>
        </li>
        <li>
          <Link to="/recommendations" activeClassName={styles.activeNav}>
            Recommendations
          </Link>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
