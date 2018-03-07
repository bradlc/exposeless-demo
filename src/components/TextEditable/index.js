import PropTypes from "prop-types";
import React, { Component } from "react";

class TextEditable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const repeater = this.props.repeater || "";

    const value = this.context.editables.filter(x => {
      return (
        x.node.page === this.context.pageName &&
        x.node.name === this.props.name &&
        x.node.repeater === repeater
      );
    })[0];

    let adminOverride =
      typeof window !== "undefined" &&
      window.editables &&
      window.editables.filter(
        x =>
          x.name === this.props.name &&
          x.page === this.context.pageName &&
          x.repeater === repeater
      );

    if (adminOverride && adminOverride.length > 0) {
      adminOverride = adminOverride[0].value;
    } else {
      adminOverride = null;
    }

    return (
      <div
        contentEditable
        onBlur={e => {
          const data = {
            page: this.context.pageName,
            name: this.props.name,
            value: e.target.textContent
          };

          if (this.props.repeater) {
            data.repeater = this.props.repeater;
          }

          window.fetch("https://expose-api-pjywjkjllq.now.sh/update", {
            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
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
