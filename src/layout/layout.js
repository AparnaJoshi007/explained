import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import Header from '../components/Header'
import config from '../../data/SiteConfig'
import styles from './index.module.scss'

const BlankLayout = ({ shouldDisplaySearch, searchIndex, isDarkTheme, children }) => (
  <>
    <Header searchIndex={searchIndex} shouldDisplaySearch={shouldDisplaySearch} />
    <Helmet>
      <meta name="description" content={config.siteDescription} />
    </Helmet>
    <div className={`${styles.mainChildren} ${isDarkTheme && styles.darkTheme}`}>
      {children}
    </div>
    <Footer />
  </>
)

export default BlankLayout
