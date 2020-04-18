const config = {
  siteTitle: 'Explained', // Site title.
  siteTitleShort: 'Explained', // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: 'Explained', // Alternative site title for SEO.
  siteLogo: 'static/logos/logo.png', // Logo used for SEO and manifest.
  siteLogoDisplay: 'https://i.ibb.co/gV9qCSv/logo.png', // logo to be displayed
  favicon: 'static/logos/logo.png',
  siteUrl: 'https://explained.netlify.com', // Domain of your website without pathPrefix.
  pathPrefix: '', // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription:
    'A blog to explain everyday things', // Website description used for RSS feeds/meta description tag.
  siteRss: '/rss.xml', // Path to the RSS file.
  siteFBAppID: '1825356251115265', // FB Application ID for using app insights
  googleAnalyticsID: 'UA-161211056-1', // GA tracking ID.
  dateFromFormat: 'YYYY-MM-DD', // Date format used in the frontmatter.
  dateFormat: 'DD/MM/YYYY', // Date format for display.
  userName: 'Aparna Joshi', // Username to display in the author segment.
  userEmail: 'aparnajoshi.88@gmail.com', // Email used for RSS feed's author segment
  userTwitter: 'aparna_joshi_', // Optionally renders "Follow Me" in the Bio segment.
  userGitHub: 'AparnaJoshi007', // Optionally renders "Follow Me" in the Bio segment.
  userLocation: 'Bangalore, India', // User location to display in the author segment.
  userAvatar: 'https://i.ibb.co/wLbCgFV/avatar-square.png', // User avatar location
  userDescription:
    "Software developer by profession, wanderer by choice.", // User description to display in the author segment.
  copyright: 'Copyright © 2020. All rights reserved.', // Copyright string for the footer of the website and RSS feed.
  themeColor: '#c62828', // Used for setting manifest and progress theme colors.
  backgroundColor: 'red' // Used for setting manifest background color.
}

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = ''
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/')
  config.siteUrl = config.siteUrl.slice(0, -1)

// Make sure siteRss has a starting forward slash
// if (config.siteRss && config.siteRss[0] !== "/")
//   config.siteRss = `/${config.siteRss}`;

module.exports = config
