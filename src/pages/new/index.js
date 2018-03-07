import React from "react";
import Link from "gatsby-link";
import { Route } from "react-router-dom";

const NewPage = () => (
  <div>
    <Route
      path="/new/:path"
      render={({ match: { params } }) => {
        return <h1>{params.path}</h1>;
      }}
    />
  </div>
);

export default NewPage;
