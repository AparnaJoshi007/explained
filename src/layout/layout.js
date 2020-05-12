import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import Header from '../components/Header'
import config from '../../data/SiteConfig'

const BlankLayout = ({ shouldDisplaySearch, searchIndex, children }) => (
  <>
    <Header searchIndex={searchIndex} shouldDisplaySearch={shouldDisplaySearch} />
    <Helmet>
      <meta name="description" content={config.siteDescription} />
    </Helmet>
    {children}
    <Footer />
  </>
)

export default BlankLayout
