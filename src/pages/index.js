import React from 'react'
import Link from 'gatsby-link'
import Page from '../components/Page'
import TextEditable from '../components/TextEditable'

const IndexPage = ({data}) => (
  <div>
    {/* <h1>{(typeof window !== 'undefined' && window.foo) || data.site.siteMetadata.title}</h1> */}
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/new/foobar">Go to page 2</Link>
    <Page name="home">
      <TextEditable name="title" />
      <TextEditable name="lol" />
    </Page>
  </div>
)

export default IndexPage
