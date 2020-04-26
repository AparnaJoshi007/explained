import React from 'react'
import styles from './PostFooter.module.scss'

const PostFooter = ({ config, post, lightMode }) => (
  <>
    <footer className={styles.postCardMeta}>
      <a className={styles.staticAvatar} href={`https://twitter.com/${config.userTwitter}`}>
        <img className={styles.authorProfileImage} src={config.siteLogoDisplay.replace("static", "")} alt={config.userName} />
      </a>
      <div className={styles.postCardMetaContent}>
        <span>
          <a className={lightMode ? styles.nameLight : styles.name} href={`https://twitter.com/${config.userTwitter}`}>{config.userName}</a>
        </span>
        <span>
          <span>{post.date} &nbsp;</span>
          <span className={styles.bull}>• </span>
          {post.timeToRead} min read
        </span>
      </div>
    </footer>
  </>
)

export default PostFooter
