import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import Header from '../components/Header'
import config from '../../data/SiteConfig'
import Categories from '../components/Categories'
import HomePageHero from '../components/HomePageHero'
import FeaturedPost from '../components/FeaturedPost'
import styles from './index.module.scss'

const MainLayout = ({ shouldDisplaySearch, postEdges, searchIndex, children }) => (
  <>
    <div className={styles.headerWrapper}>
      <Header searchIndex={searchIndex} shouldDisplaySearch={shouldDisplaySearch} transparentHeader />
      <HomePageHero />
      <FeaturedPost postEdges={postEdges} />
      <ul className={styles.catNav}>
        <Categories activeClassName={styles.activeNav} />
      </ul>
    </div>
    <Helmet>
      <meta name="description" content={config.siteDescription} />
    </Helmet>
    <div className={styles.mainChildren}>
      {children}
    </div>
    <Footer />
  </>
)

export default MainLayout
