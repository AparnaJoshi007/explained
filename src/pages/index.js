import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import SEO from '../components/SEO'
import HomePageHero from '../components/HomePageHero'
import config from '../../data/SiteConfig'

const Index = ({ data }) => {
  const edges = data.allMarkdownRemark.edges.slice(0, 6);
  return (
    <Layout>
      <main>
        <Helmet title={config.siteTitle} />
        <HomePageHero />
        <SEO />
        <PostListing postEdges={edges} />
        <Link to="/blog">
          more to read →
        </Link>
      </main>
    </Layout>
  )
}

export default Index

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
            categories
          }
        }
      }
    }
  }
`
