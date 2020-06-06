import React from 'react'
import Helmet from 'react-helmet'
import BlankLayout from '../layout/layout'
import NotFound from '../components/404'
import config from '../../data/SiteConfig'

const NotFoundPage = () => (
  <BlankLayout isDarkTheme>
    <main>
      <Helmet title={`404: Not Found | ${config.siteTitle}`} />
      <NotFound />
    </main>
  </BlankLayout>
)

export default NotFoundPage
