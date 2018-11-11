const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  console.log(node.internal.type);
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDestinationsJson {
          edges {
            node {
              j_nodename
            }
          }
        }
      }

    `
    ).then(result => {
      console.log(result.data.allDestinationsJson.edges)
      result.data.allDestinationsJson.edges.forEach(({ node }) => {
          console.log("node=", node);
          createPage({
            path: node.j_nodename,
            component: path.resolve(`./src/templates/destination.js`),
            context: {
              // Data passed to context is available
              // in page queries as GraphQL variables.
              slug: node.j_nodename,
            },
        })
      })
      resolve()
    })
  })
}
