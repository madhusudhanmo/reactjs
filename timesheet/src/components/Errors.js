import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import lodash from "lodash";

const Errors = ({ errors }) => {
  if (!lodash.isEmpty(errors)) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {errors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))}
      </Alert>
    );
  }

  return null;
};

export default Errors;
