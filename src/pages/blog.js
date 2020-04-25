import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import BlankLayout from '../layout/layout'
import PostListing from '../components/PostListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'

const Blog = ({ data }) => (
  <BlankLayout>
    <main>
      Add some heading babe
      <Helmet title={`Blogs | ${config.siteTitle}`} />
      <SEO />
      <PostListing postEdges={data.allMarkdownRemark.edges} />
    </main>
  </BlankLayout>
)

export default Blog

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query {
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
