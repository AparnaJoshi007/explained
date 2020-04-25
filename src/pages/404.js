import React from 'react'
import Helmet from 'react-helmet'
import BlankLayout from '../layout/layout'
import config from '../../data/SiteConfig'

const NotFoundPage = () => (
  <BlankLayout>
    <main>
      <Helmet title={`404: Not Found | ${config.siteTitle}`} />
      <h1>404 Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </main>
  </BlankLayout>
)

export default NotFoundPage
