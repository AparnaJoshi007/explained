import React from 'react'
import Helmet from 'react-helmet'
import BlankLayout from '../layout/layout'
import About from '../components/About'
import config from '../../data/SiteConfig'

const AboutPage = () => (
  <BlankLayout>
    <main>
      <Helmet title={`About | ${config.siteTitle}`} />
      <About />
    </main>
  </BlankLayout>
)

export default AboutPage
