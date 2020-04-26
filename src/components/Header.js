import React from 'react'
import { Link } from 'gatsby'
import config from '../../data/SiteConfig'
import styles from './Header.module.scss'

const Header = ({ transparentHeader }) => (
  <header className={transparentHeader ? styles.transparentHeader : ''}>
    <h1>
      <Link to="/" activeClassName={styles.activeNav}>
        <img src={config.siteNameLogo.replace("static", "")} alt="explained" />
      </Link>
    </h1>
    <nav>
      <ul className={styles.mainNav}>
        <li>
          <Link to="/blog" activeClassName={styles.activeNav}>
            Blogs
          </Link>
        </li>
        <li>
          <Link to="/about" activeClassName={styles.activeNav}>
            Author
          </Link>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
