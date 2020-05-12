import React, { useState }  from 'react'
import SearchResults from './SearchResults'
import styles from './Search.module.scss'

const Search = ({ searchIndex }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const search = e => {
        const query = e.target.value
        const results = searchIndex.search(query, {}).map(({ ref }) => 
        searchIndex.documentStore.getDoc(ref));
        setSearchResults(results);
    }

  return (
    <>
      <div className={styles.search}>
        <input
          className={styles.searchBox}
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            search(e);
          }} 
        />
        <button type="reset" className={styles.clearInput} onClick={() => {setSearchValue(""); setSearchResults([]);}}>
          <span>clear input</span>
        </button>
      </div>
      {
        (searchResults.length > 0) &&
        (
          <div className={styles.searchResults}>
            <SearchResults searchResults={searchResults} />
          </div>
        )
      }
    </>
  );
}

export default Search
