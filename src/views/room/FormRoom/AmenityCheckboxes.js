import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormLabel,
  makeStyles
} from '@material-ui/core';
import FormControls from 'src/components/Forms';
import api from '../../../api';

const useStyles = makeStyles(() => ({
  checkboxGroup: {
    marginLeft: '8px',
    padding: '0px',
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
}));

const AmenityCheckboxes = ({ name, handleChange }) => {
  const classes = useStyles();
  const [amenities, setAmenities] = useState([]);
  const [amenityIds, setAmenityIds] = useState([]);

  const createAmenityLists = (id) => {
    const selectedIndex = amenityIds.indexOf(id);
    let newCheckedAmenityIds = [];

    if (selectedIndex === -1) {
      newCheckedAmenityIds = newCheckedAmenityIds.concat(amenityIds, id);
    } else if (selectedIndex === 0) {
      newCheckedAmenityIds = newCheckedAmenityIds.concat(amenityIds.slice(1));
    } else if (selectedIndex === amenityIds.length - 1) {
      newCheckedAmenityIds = newCheckedAmenityIds.concat(amenityIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newCheckedAmenityIds = newCheckedAmenityIds.concat(
        amenityIds.slice(0, selectedIndex),
        amenityIds.slice(selectedIndex + 1)
      );
    }

    setAmenityIds(newCheckedAmenityIds);

    handleChange({ target: { name, value: newCheckedAmenityIds } });
  };

  const onCheckboxChange = (e) => {
    createAmenityLists(e.target.name);
  };

  useEffect(() => {
    async function fetchAmenities() {
      const res = await api.get('/amenities');

      setAmenities(res.data);
    }

    fetchAmenities();
  }, []);

  console.log(amenityIds);

  return (
    <div className={classes.checkboxGroup}>
      <FormGroup row>
        <FormLabel component="legend">สิ่งอำนวยความสะดวก (เลือกได้มากกว่า 1 รายการ)</FormLabel>
        {amenities.map((am) => (
          <FormControls.CheckboxInput
            key={am.amenity_id}
            name={am.amenity_id}
            label={am.amenity_desc}
            handleChange={onCheckboxChange}
          />
        ))}
      </FormGroup>
    </div>
  );
};

AmenityCheckboxes.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func
};

export default AmenityCheckboxes;
