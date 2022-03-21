import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import 'antd/dist/antd.css';

const TagInput = ({ items, onRemove }) => {
  const handleRemove = (an) => {
    onRemove(an);
  };

  return (
    <>
      {items && items.map((item) => {
        return (
          <Tag color="cyan" key={item.an} closable onClose={() => handleRemove(item.an)}>
            {`${item.an}-${item.name}`}
          </Tag>
        );
      })}
    </>
  );
};

TagInput.propTypes = {
  items: PropTypes.array,
  onRemove: PropTypes.func
};

export default TagInput;
