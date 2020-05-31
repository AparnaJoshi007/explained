import React from 'react'
import { Follow } from 'react-twitter-widgets'
import styles from './Bio.module.scss'

const Bio = ({ config, expanded }) => (
  <div className={styles.bioContainer}>
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
        who works as a software engineer in Bangalore.  
        Aparna is also a technology enthusiast, writer, and artist.
        She has an immense passion and curiosity towards psychology and its implications on human behavior.
        Her links: 
        {` `} 
        <a href="https://aparnajoshi.netlify.app" target="_blank" rel="noopener noreferrer"><strong>Blog,</strong></a>
        {` `}
        <a href="https://twitter.com/aparna_joshi_" target="_blank" rel="noopener noreferrer"><strong>Twitter,</strong></a>
        {` `}
        <a href="mailto:aparnajoshi.88@gmail.com"><strong>Email,</strong></a>
        {` `}
        <a href="https://www.getrevue.co/profile/aparnajoshi/" target="_blank" rel="noopener noreferrer"><strong>Newsletter</strong></a>
      </span>
      <Follow
        username={config.userTwitter}
        options={{ count: expanded ? true : 'none' }}
      />
    </p>
  </div>
)

export default Bio
