import React from 'react';
import PropTypes from 'prop-types';

import './FileList.css';
import FilePicker from '../FilePicker/FilePicker';
import FILE_STATUS from '../../constants';

const renderStatusText = (file) => {
  let statusText = "";
  switch (file.status) {
    case FILE_STATUS.SUCCESS:
      statusText = (<span><i className="fa fa-check-circle file-success"/> File Uploaded</span>);
      break;
    case FILE_STATUS.ERROR:
      statusText = (<span><i className="fa fa-times-circle file-error"/> Upload Failed</span>);
      break;
    case FILE_STATUS.LOADING:
      statusText = (file.downloadProgress !== 100) ?
        `${file.downloadProgress}% loaded`
        : `${file.uploadProgress}% uploaded`;
      break;
    case FILE_STATUS.READY:
    default:
      statusText = "Ready for Upload";
      break;
  }
  return (
    <span className="progress-text">{statusText}</span>
  );
}

const FileList = (props) => {
  return (
    <div className="file-list-container">
      <FilePicker
        className={
          Object.keys(props.files).length < 1 ?
          "fill-container"
          : "dropped-file"
        }
        onFileSelect={props.onFileSelect}
      />
      {
        Object.values(props.files).map(f => (
          <div
            key={f.name}
            className={`dropped-file status-${f.status}`}
          >
            <i className="fa fa-file file-icon" />
            <span className="file-name">{f.name}</span>
            <div
              className="progress-bar loading-progress-bar" 
              style={{ width: `${f.download}%` }}
            />
            <div
              className="progress-bar uploading-progress-bar" 
              style={{ width: `${f.upload}%`}}
            />
            {renderStatusText(f)}
            <i
              className="fa fa-trash file-icon delete-file-icon"
              onClick={(e) => props.onRemoveFileFromList(f.name)}
            />
          </div>
        ))
      }
    </div>
  )
};

FileList.propTypes = {
  files: PropTypes.object.isRequired,
  onFileSelect: PropTypes.func.isRequired,
  onRemoveFileFromList: PropTypes.func.isRequired,
};

export default FileList;
