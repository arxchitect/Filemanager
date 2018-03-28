import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import './FilePicker.css';

const FilePicker = (props) => {
  return (
    <div className={props.className}>
      <Dropzone className="drop-zone" onDrop={props.onFileSelect}>
        <i className="fa fa-folder-open drop-zone-icon file-icon"></i>
        <div className="description-text">
          <span>Drop files here to upload </span>
          <span>or <u>click to choose files</u></span>
        </div>
      </Dropzone>
    </div>
  );

}

FilePicker.propTypes = {
  className: PropTypes.string,
  onFileSelect: PropTypes.func.isRequired,
}

export default FilePicker;