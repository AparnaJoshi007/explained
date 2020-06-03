import React from 'react'
import config from '../../data/SiteConfig'
import styles from './HomePageHero.module.scss'

const HomePageHero = () => (
  <h2 className={styles.hero}> 
    <img src={config.siteNameLogo.replace("static", "")} alt="aparnajoshi" />    
    <span>{config.siteMotto}</span>
  </h2>
)

export default HomePageHero
