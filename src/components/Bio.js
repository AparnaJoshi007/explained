import React from 'react'
import { Follow } from 'react-twitter-widgets'
import styles from './Bio.module.scss'

const Bio = ({ config, expanded }) => (
  <>
    <img
      className={styles.avatar}
      src={config.userAvatar.replace("static", "")}
      alt={config.userName}
    />
    <p>
      <span className={styles.userBio}>
        Written by {` `}
        <a className={styles.userNameLink} href="https://www.linkedin.com/in/aparna-joshi-9698a988/" target="_blank" rel="noopener noreferrer">
          <strong>{config.userName}</strong>
        </a>
        {` `}
        who lives and works in Bangalore.
        {` `}
      </span>
      <Follow
        username={config.userTwitter}
        options={{ count: expanded ? true : 'none' }}
      />
    </p>
  </>
)

export default Bio
