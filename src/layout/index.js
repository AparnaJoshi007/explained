import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import Header from '../components/Header'
import config from '../../data/SiteConfig'
import Categories from '../components/Categories'
import styles from './index.module.scss'

const MainLayout = ({ children }) => (
  <>
    <Header />
    <ul className={styles.catNav}>
      <Categories activeClassName={styles.activeNav} />
    </ul>
    <Helmet>
      <meta name="description" content={config.siteDescription} />
    </Helmet>
    {children}
    <Footer />
  </>
)

export default MainLayout
