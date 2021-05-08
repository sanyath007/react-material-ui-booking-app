import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Collapse, Card } from 'react-bootstrap';
import { Button as MuiButton, makeStyles } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(() => ({
  collapseWrapper: {
    padding: '5px',
    marginTop: '2px',
    position: 'absolute'
  },
  collapseContent: {
    overflow: 'hidden',
    maxWidth: '90vw'
  }
}));

const AdvancedSearchBox = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <MuiButton
        variant="contained"
        color="primary"
        style={{ padding: '16px 14px', marginLeft: '5px' }}
        onClick={() => setOpen(!open)}
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        Advanced Search
      </MuiButton>

      <Collapse in={open} className={classes.collapseWrapper}>
        <Card className={classes.collapseContent}>
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
          labore wes anderson cred nesciunt sapiente ea proident.
        </Card>
      </Collapse>
    </>
  );
};

AdvancedSearchBox.propTypes = {
  // expanded: PropTypes.bool
};

export default AdvancedSearchBox;
