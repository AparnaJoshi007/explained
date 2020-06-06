import React from 'react'
import config from '../../data/SiteConfig'
import styles from './404.module.scss'

const NotFound = () => (
  <div className={styles.notFound}>
    <img src={config.notFoundImg.replace("static", "")} alt="404 page" />
    <p>You just hit a route that doesn&#39;t exist....</p>
    <a className={styles.anchorPoint} href="/">Go to Home</a>
  </div>
)

export default NotFound
