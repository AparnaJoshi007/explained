import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import Header from '../components/Header'
import config from '../../data/SiteConfig'
import Categories from '../components/Categories'
import HomePageHero from '../components/HomePageHero'
import FeaturedPost from '../components/FeaturedPost'
import styles from './index.module.scss'

const MainLayout = ({ postEdges, children }) => (
  <>
    <div className={styles.headerWrapper}>
      <Header />
      <HomePageHero />
      <FeaturedPost postEdges={postEdges} />
      <ul className={styles.catNav}>
        <Categories activeClassName={styles.activeNav} />
      </ul>
    </div>
    <Helmet>
      <meta name="description" content={config.siteDescription} />
    </Helmet>
    {children}
    <Footer />
  </>
)

export default MainLayout
