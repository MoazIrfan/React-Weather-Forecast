import React from "react";
import { Typography } from '@material-ui/core';
import useStyles from './styles';

const FullPageLoader = () => {
 const classes = useStyles();
  return (
   <div className={classes.fpContainer} >
    <Typography variant="h4" className={classes.fpLoading}>Loading...</Typography>
   </div>
  );
};

export default FullPageLoader;