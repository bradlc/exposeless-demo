import React from "react";
import TextEditable from "../TextEditable";
import PropTypes from "prop-types";
import { withProps } from "recompose";

const data = {
  sections: {
    home: {
      body: [
        {
          id: 1,
          name: "text",
          data: {}
        },
        {
          id: 2,
          name: "text",
          data: {}
        }
      ]
    }
  }
};

class Repeatable extends React.Component {
  render() {
    const sections = data.sections[this.context.pageName][this.props.name];
    return (
      <div>
        {sections.map((section, index) => {
          const C = this.props.variants[section.name];

          return (
            <C
              n={index + 1}
              total={sections.length}
              TextEditable={withProps({ repeater: this.props.name })(TextEditable)}
              key={section.id}
            />
          );
        })}
      </div>
    );
  }
}

// <Repeatable name="foo" variants={variants} />

Repeatable.contextTypes = {
  editables: PropTypes.array,
  pageName: PropTypes.string
};

export default Repeatable;
