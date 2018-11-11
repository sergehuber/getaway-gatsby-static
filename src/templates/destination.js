import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { withPrefix } from 'gatsby'

export default ({ data }) => {
  const destination = data.destinationsJson;
  const photos = destination.photos.map((photo) => (
    <img src={withPrefix(photo.jcr_refNode.jcr_nodes[0].jcr_data)} />
));
  return (
    <Layout>
      <div>
        <h1>{destination.destinationname} - {destination.country}</h1>
        { photos }
        <div>{destination.headline}</div>
        <div>{destination.outline}</div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
      destinationsJson(j_nodename: {eq: $slug}) {
        destinationname
        area
        country
        populationCount
        highlight
        headline
        outline
        photos {
          jcr_refNode {
            jcr_nodes {
              jcr_data
            }
          }
        }
      }
  }
`
