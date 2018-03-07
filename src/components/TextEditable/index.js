import PropTypes from "prop-types";
import React, { Component } from "react";

class TextEditable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const value = this.context.editables.filter(x => {
      return (
        x.node.page === this.context.pageName && x.node.name === this.props.name
      );
    })[0];

    let adminOverride =
      typeof window !== "undefined" &&
      window.editables &&
      window.editables.filter(
        x => x.name === this.props.name && x.page === this.context.pageName
      );

    if (adminOverride && adminOverride.length > 0) {
      adminOverride = adminOverride[0].value;
    } else {
      adminOverride = null
    }

    return (
      <div
        contentEditable
        onBlur={e => {
          window.fetch("https://expose-api-wrvpvxlcdy.now.sh/update", {
            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              page: this.context.pageName,
              name: this.props.name,
              value: e.target.textContent
            })
          });
        }}
      >
        {adminOverride ||
          (value && value.node.value) ||
          this.props.initial ||
          "Lorem ipsum"}
      </div>
    );
  }
}

TextEditable.contextTypes = {
  editables: PropTypes.array,
  pageName: PropTypes.string
};

TextEditable.propTypes = {
  name: PropTypes.string.isRequired,
  initial: PropTypes.string
};

export default TextEditable;
