import React from 'react';
import {
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
  header: {
    marginTop: '1em'
  }
})

function Navbar() {
  const classes = useStyles();
  return (
    <>
      <header className={classes.header}>
        <Typography
          component="div"
          variant="h4"
          align="center"
        >
          ToDo List
        </Typography>
      </header>
    </>
  )
}

export default Navbar;