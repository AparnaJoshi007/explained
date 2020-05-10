import React, { useState }  from 'react'
import { Link } from 'gatsby'
import SearchResults from './SearchResults'
import config from '../../data/SiteConfig'
import styles from './Header.module.scss'

const Header = ({ transparentHeader }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState();
  const displaySearch = (value) => {
  }

  return (
    <header className={transparentHeader ? styles.transparentHeader : ''}>
      <h1>
        <Link to="/" activeClassName={styles.activeNav}>
          <img src={config.homeLogo.replace("static", "")} alt="aparnajoshi" />
        </Link>
      </h1>
      <nav>
        <ul className={styles.mainNav}>
          <li>
            <div className={styles.search}>
              <input
                className={styles.searchBox}
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  displaySearch(e.target.value);
                }} 
              />
              <button type="reset" className={styles.clearInput} onClick={() => setSearchValue("")}>
                <span>clear input</span>
              </button>
            </div>
            
          </li>
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
  );
}

export default Header
