import React from 'react'
import { Link } from 'gatsby'
import PostFooter from './PostFooter'
import config from '../../data/SiteConfig'
import styles from './FeaturedPost.module.scss'

const FeaturedPost = ({ postEdges }) => {
  const getPostList = () => {
    const postList = []
    if (postEdges) {
        postEdges.forEach(postEdge => {
            postList.push({
              path: postEdge.node.fields.slug,
              tags: postEdge.node.frontmatter.tags,
              categories: postEdge.node.frontmatter.categories,
              cover: postEdge.node.frontmatter.cover,
              title: postEdge.node.frontmatter.title,
              date: postEdge.node.fields.date,
              excerpt: postEdge.node.excerpt,
              timeToRead: postEdge.node.timeToRead
            })
          })
    }
    
    return postList
}

  const postList = getPostList()

  return (
    <div className={styles.featuredArticleList}>
      {/* Your post list here. */
      postList.map(post => (
        <Link to={post.path} key={post.title} className={styles.featuredPostCardLink}>
          <div className={styles.imageWrapper}>
            <div aria-hidden="true" className={styles.imageDiv} />
            <img src={post.cover} alt="img-cover" />
          </div>
          <article className={styles.articleBox}>
            <div className={styles.right}>
              <div className={styles.meta}>
                <span>{post.categories.join(' / ')}</span>
              </div>
              <h2 className={styles.postCardTitle}>{post.title}</h2>
              <p>{post.excerpt}</p>
            </div>
            <PostFooter config={config} post={post} lightMode />
          </article>
        </Link>
      ))}
    </div>
  )
}

export default FeaturedPost
