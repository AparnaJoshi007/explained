import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import { Index as ElasticIndex } from "elasticlunr"
import Layout from '../layout'
import PostListing from '../components/PostListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'

const Index = ({ data }) => {
  const edges = data.allMarkdownRemark.edges;
  const searchIndex = data.siteSearchIndex.index;
  const postEdges = [];
  const featuredPostEdges = [];
  edges.forEach(edge => {
    const featured = edge.node.frontmatter.featured;
    if(featured === false) {
      if(postEdges.length < 5) {
        postEdges.push(edge);
      }
    } else {
      featuredPostEdges.push(edge);
    }
  });

  const getOrCreateIndex = () => {
    return ElasticIndex.load(searchIndex);
  }

  const index = getOrCreateIndex();
  
  return (
    <Layout postEdges={featuredPostEdges} searchIndex={index} shouldDisplaySearch>
      <main>
        <Helmet title={config.siteTitle} />
        <SEO />
        <PostListing postEdges={postEdges} />
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
            featured
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
