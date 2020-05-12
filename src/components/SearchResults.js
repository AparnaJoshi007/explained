import React from 'react'
import styles from './SearchResults.module.scss'

const SearchResults = ({ searchResults }) => {
  return(
    <div className={styles.resultContainer}>
      {
        searchResults.map(result => (
          <a href={result.path}>{result.title}</a>
        ))
      }
    </div>
)
  }

export default SearchResults
