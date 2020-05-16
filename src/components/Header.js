import React from 'react'
import { Link } from 'gatsby'
import Search from './Search'
import config from '../../data/SiteConfig'
import styles from './Header.module.scss'

const Header = ({ searchIndex, transparentHeader, shouldDisplaySearch }) => {
  return (
    <header className={transparentHeader ? styles.transparentHeader : ''}>
      <h1>
        <Link to="/" activeClassName={styles.activeNav}>
          <img src={config.homeLogo.replace("static", "")} alt="aparnajoshi" />
        </Link>
      </h1>
      <nav>
        <ul className={styles.mainNav}>
          {shouldDisplaySearch &&
            (
            <li>
              <Search searchIndex={searchIndex} />
            </li>
            )
          }
          <li>
            <Link to="/blog-list" activeClassName={styles.activeNav}>
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
  );
}

export default Header
