import React from 'react'
import Helmet from 'react-helmet'
import { Index as ElasticIndex } from "elasticlunr"
import { graphql } from 'gatsby'
import BlankLayout from '../layout/layout'
import PostListing from '../components/PostListing'
import SEO from '../components/SEO'
import BlogHeader from '../components/BlogHeader'
import config from '../../data/SiteConfig'

const Blog = ({ data }) => {
  const blogCount = data.allMarkdownRemark.edges.length;
  const searchIndex = data.siteSearchIndex.index;
  const getOrCreateIndex = () => {
    return ElasticIndex.load(searchIndex);
  }
  const index = getOrCreateIndex();

  return (
    <BlankLayout searchIndex={index} shouldDisplaySearch>
      <main>
        <Helmet title={`Blogs | ${config.siteTitle}`} />
        <SEO />
        <BlogHeader blogCount={blogCount} />
        <PostListing postEdges={data.allMarkdownRemark.edges} />
      </main>
    </BlankLayout>
  )
}
  

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
    siteSearchIndex {
      index
    }
  }
`
