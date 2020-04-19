import React from 'react'
import Helmet from 'react-helmet'
import BlankLayout from '../layout/layout'
import config from '../../data/SiteConfig'

const RecommendationsPage = () => (
  <BlankLayout>
    <main>
      <Helmet title={`Recommendations | ${config.siteTitle}`} />
      <h1>This weeks Recommendations 👻</h1>
      <p>Recommendation information</p>
    </main>
  </BlankLayout>
)
export default RecommendationsPage
