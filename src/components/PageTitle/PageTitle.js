import React from "react";
import { Typography } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components

export default function PageTitle(props) {
  var classes = useStyles();

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1" size="sm">
        {props.title}
      </Typography>
    </div>
  );
}
