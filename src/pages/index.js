import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "react-emotion"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1
          className={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Latest destinations
        </h1>
        <h4>{data.allDestinationsJson.totalCount} Posts</h4>
        {data.allDestinationsJson.edges.map(({ node }) => (
          <div key={node.j_nodename}>
          <Link
            to={node.j_nodename}
            className={css`
              text-decoration: none;
              color: inherit;
            `
}
          >
            <h3
              className={css`
                margin-bottom: ${rhythm(1 / 4)};
              `}
            >
              {node.destinationname}{" "}
              <span
                className={css`
                  color: #bbb;
                `}
              >
                — {node.country}
              </span>
            </h3>
            <p>{node.headline}</p>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allDestinationsJson {
      totalCount
      edges {
        node {
          j_nodename
          headline
          country
          destinationname          
        }
      }
    }
  }
`
