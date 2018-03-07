import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Header from "../components/Header";
import "./index.css";

class TemplateWrapper extends React.Component {
  getChildContext() {
    return { editables: this.props.data.allEditable.edges };
    // return { editables: this.props.data}
  }
  render() {
    return (
      <div>
        <Helmet
          title="Gatsby Default Starter"
          meta={[
            { name: "description", content: "Sample" },
            { name: "keywords", content: "sample, something" }
          ]}
        />
        <Header />
        <div
          style={{
            margin: "0 auto",
            maxWidth: 960,
            padding: "0px 1.0875rem 1.45rem",
            paddingTop: 0
          }}
        >
          {this.props.children()}
        </div>
        <button
          onClick={() => {
            window.fetch("https://expose-api-vgqjikjmny.now.sh/publish");
          }}
          style={{ position: "absolute", bottom: "50px", right: "50px" }}
        >
          Publish
        </button>
      </div>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

TemplateWrapper.childContextTypes = {
  editables: PropTypes.array
};

export const query = graphql`
  query EditablesQuery {
    allEditable {
      edges {
        node {
          id
          name
          page
          value
        }
      }
    }
  }
`;

export default TemplateWrapper;
