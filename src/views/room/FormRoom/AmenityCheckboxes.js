import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormLabel,
  makeStyles
} from '@material-ui/core';
import FormControls from 'src/components/Forms';

const useStyles = makeStyles(() => ({
  checkboxGroup: {
    marginLeft: '8px',
    padding: '0px',
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
}));

const initialAmenities = {
  bathroom: false,
  waterheater: false,
  refrigerator: false,
  wardrobe: false,
  television: false,
  microwave: false,
  diningtable: false,
  air: false,
  bed: false,
};

const AmenityCheckboxes = ({ name, handleChange }) => {
  const classes = useStyles();
  const [amenities, setAmenities] = useState(initialAmenities);
  const [amenityIds, setAmenityIds] = useState([]);

  const createAmenityLists = (id) => {
    const index = amenityIds.indexOf(id);
    let newCheckedAmenityIds = [];
    console.log(index);

    if (index === -1) {
      newCheckedAmenityIds = newCheckedAmenityIds.concat(amenityIds, id);
    } else {
      newCheckedAmenityIds = newCheckedAmenityIds.concat(
        amenityIds.splice(0, index),
        amenityIds.splice(index + 1)
      );
    }

    setAmenityIds(newCheckedAmenityIds);

    handleChange({ target: { name, value: newCheckedAmenityIds } });
  };

  const onCheckboxChange = (e) => {
    setAmenities({ ...amenities, [e.target.name]: e.target.value });

    createAmenityLists(e.target.name);
  };

  console.log(amenityIds);

  return (
    <div className={classes.checkboxGroup}>
      <FormGroup row>
        <FormLabel component="legend">สิ่งอำนวยความสะดวก (เลือกได้มากกว่า 1 รายการ)</FormLabel>
        <FormControls.CheckboxInput
          name="refrigerator"
          label="ตู้เย็น"
          value={amenities.refrigerator}
          handleChange={onCheckboxChange}
        />
        <FormControls.CheckboxInput
          name="wardrobe"
          label="ตู้เสื้อผ้า"
          value={amenities.wardrobe}
          handleChange={onCheckboxChange}
        />
        <FormControls.CheckboxInput
          name="television"
          label="ทีวี"
          value={amenities.television}
          handleChange={onCheckboxChange}
        />
        <FormControls.CheckboxInput
          name="microwave"
          label="ไมโครเวฟ"
          value={amenities.microwave}
          handleChange={onCheckboxChange}
        />
        <FormControls.CheckboxInput
          name="bed"
          label="เตียงญาติ"
          value={amenities.bed}
          handleChange={onCheckboxChange}
        />
        <FormControls.CheckboxInput
          name="bathroom"
          label="ห้องน้ำ"
          value={amenities.bathroom}
          handleChange={onCheckboxChange}
        />
        <FormControls.CheckboxInput
          name="waterheater"
          label="เครื่องทำน้ำอุ่น"
          value={amenities.waterheater}
          handleChange={onCheckboxChange}
        />
        <FormControls.CheckboxInput
          name="diningtable"
          label="โต๊ะ-เก้าอี้"
          value={amenities.diningtable}
          handleChange={onCheckboxChange}
        />
        <FormControls.CheckboxInput
          name="air"
          label="แอร์"
          value={amenities.air}
          handleChange={onCheckboxChange}
        />
      </FormGroup>
    </div>
  );
};

AmenityCheckboxes.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func
};

export default AmenityCheckboxes;
