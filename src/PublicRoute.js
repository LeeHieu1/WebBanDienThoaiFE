import React from "react";
import { Route } from "react-router-dom";
import Footer from "./layouts/admin/Footer";
import FrontendLayout from "./layouts/frontend/FrontendLayout";

function PublicRoute({ ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <FrontendLayout {...props} /> <Footer />
        </>
      )}
    />
  );
}

export default PublicRoute;
