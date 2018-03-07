/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const pify = require("pify");
const request = pify(require("request"), { multiArgs: true });
const crypto = require("crypto");

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators;
  // Create nodes here, generally by downloading data
  // from a remote API.
  const [, body] = await request("https://expose-api-xvswukbzwf.now.sh/read");

  // Process data into nodes.
  JSON.parse(body).forEach(datum => createNode(processDatum(datum)));

  // We're done, return.
  return;
};

function processDatum(datum) {
  return {
    id: `editable-${datum.id}`,
    name: datum.name,
    page: datum.page,
    repeater: datum.repeater || -1,
    value: datum.value,
    parent: null,
    children: [],
    internal: {
      type: "Editable",
      contentDigest: crypto
        .createHash("md5")
        .update(JSON.stringify(datum))
        .digest("hex")
    }
  };
}
