import React from 'react';
import PropTypes from 'prop-types';
import { styles } from './styles';

export function Marker({ text, onClick }) {
  return (
    <View style={styles.popup}
      alt={text}
      onClick={onClick}
    />
  );
}

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};
