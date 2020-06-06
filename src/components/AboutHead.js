import React from 'react'
import config from '../../data/SiteConfig'
import styles from './AboutHead.module.scss'

const AboutHead = () => (
  <div className={styles.aboutHead}>
     <img
        className={styles.avatar}
        src={config.userAvatar.replace("static", "")}
        alt={config.userName}
      />
      <h3>
          APARNA JOSHI
      </h3>
      <span>
        Software Engineer, Blogger, and Artist in Bangalore, Karnataka, India
      </span>
  </div>
)

export default AboutHead
