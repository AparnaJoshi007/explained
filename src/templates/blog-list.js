import React from 'react'
import Helmet from 'react-helmet'
import { Index as ElasticIndex } from "elasticlunr"
import { graphql, Link } from 'gatsby'
import BlankLayout from '../layout/layout'
import PostListing from '../components/PostListing'
import SEO from '../components/SEO'
import BlogHeader from '../components/BlogHeader'
import config from '../../data/SiteConfig'
import styles from './blog-list.module.scss'

const BlogList = ({ data, pageContext }) => {
    const blogCount = data.allMarkdownRemark.totalCount;
    const searchIndex = data.siteSearchIndex.index;
    const getOrCreateIndex = () => {
        return ElasticIndex.load(searchIndex);
    }
    const index = getOrCreateIndex();

    const { currentPage, numPages } = pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/blog-list/" : `/blog-list/${(currentPage - 1).toString()}`
    const nextPage = `/blog-list/${(currentPage + 1).toString()}`

    return (
      <BlankLayout searchIndex={index} shouldDisplaySearch>
        <main>
          <Helmet title={`Blogs | ${config.siteTitle}`} />
          <SEO />
          <BlogHeader blogCount={blogCount} />
          <PostListing postEdges={data.allMarkdownRemark.edges} />
        </main>
        <nav>
          <ul className={styles.pagination}>
            {!isFirst && (
            <li>
              <Link to={prevPage} rel="prev">
                ← Previous
              </Link>
            </li>
            )}
            {Array.from({ length: numPages }, (_, i) => (
              <li>
                <Link key={`pagination-number${i + 1}`} to={`/blog-list/${i === 0 ? "" : i + 1}`}>
                  {i + 1}
                </Link>
              </li>
            ))}
            {!isLast && (
              <li>
                <Link to={nextPage} rel="next">
                    Next →
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </BlankLayout>
    );
}

export default BlogList;

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
        totalCount
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
`;