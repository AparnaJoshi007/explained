import React from 'react'
import config from '../../data/SiteConfig'
import styles from './BlogHeader.module.scss'

const BlogHeader = ({ blogCount }) => (
  <div className={styles.blogHeader}>
    <img src={config.siteLogo.replace("static", "")} alt="aparnajoshi" />
    <div className={styles.headerContent}>
      <h1 className={styles.blogTitle}>{config.siteTitle}</h1>
      <h2 className={styles.blogMeta}>You can view all the posts here...</h2>
      <div className={styles.meta}>
        <div> {blogCount} posts</div>
        <span className={styles.blogSocial}>
          <a 
            href={`https://twitter.com/${config.userTwitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
              Twitter
          </a>
        </span>
        <span className={styles.blogSocial}>
          <a 
            href={`https://linkedin.com/in/${config.userLinkedIn}`}
            target="_blank"
            rel="noopener noreferrer"
          >
              LinkedIn
          </a>
        </span>
      </div>
    </div>
  </div>
)

export default BlogHeader
