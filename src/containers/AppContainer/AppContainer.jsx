import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import aws4 from 'aws-v4-sign-small';
import FileList from '../../components/FileList';
import FILE_STATUS from '../../constants';

import './AppContainer.css';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: {} };
  }

  handleFileUploadSuccess = (fileName) => {
    const files = { ...this.state.files };
    files[fileName].status = FILE_STATUS.SUCCESS;
    this.setState({ files });
  }

  handleFileUploadError = (fileName, errorMessage) => {
    const files = { ...this.state.files };
    files[fileName].status = FILE_STATUS.ERROR;
    this.setState({ files });
  }

  handleProgress = (fileName, loadStage, progressEvent) => {
    const files = { ...this.state.files };
    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    files[fileName][loadStage] = progress;
    files[fileName].status = FILE_STATUS.LOADING;
    this.setState({ files });
  }

  handleFileRemove = (fileName) => {
    const files = { ...this.state.files };
    delete files[fileName];
    this.setState({ files });
  }

  handleFileSelect = (selectedFiles, rejectedFiles) => {
    // add file metadata to state
    const files = { ...this.state.files };
    selectedFiles.forEach(f => {
      files[f.name] = {
        name: f.name,
        type: f.type,
        size: f.size,
        data: "",
        status: FILE_STATUS.LOADING,
        download: 0,
        upload: 0,
      };
    });
    this.setState({ files });

    // Read each of the files into memory
    selectedFiles.forEach(selectedFile => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const files = { ...this.state.files };
        files[selectedFile.name].data = btoa(reader.result);
        files[selectedFile.name].status = FILE_STATUS.READY;
        this.setState({ files });
      };
      reader.onprogress = (e) => this.handleProgress(selectedFile.name, "download", e);

      reader.readAsBinaryString(selectedFile);
    });
  }

  handleUpload = () => {
    Object.values(this.state.files).filter(f => f.status === FILE_STATUS.READY).forEach(f => {
      const request = {
        host: 'upgyak6or2.execute-api.us-east-1.amazonaws.com',
        service: 'execute-api',
        region: 'us-east-1',
        method: 'PUT',
        url: `https://upgyak6or2.execute-api.us-east-1.amazonaws.com/production/uva-file-uploads/${f.name}`,
        data: f.data,
        body: f.data, // aws4 looks for body; axios for data
        path: `/production/uva-file-uploads/${f.name}`,
        headers: {
          "Content-Type": f.type,
          "Content-Length": f.data.length
        },
        onUploadProgress: (e) => this.handleProgress(f.name, "upload", e)
      };
      
      const signedRequest = aws4.sign(request, {
        secretAccessKey: this.props.auth.accessKey,
        accessKeyId: this.props.auth.accessId
      });

      axios(signedRequest).then(result => {
        // result.status === 200)
        this.handleFileUploadSuccess(f.name);
      }).catch(e => {
        let status = "";
        switch (e.response.status) {
          case 403:
            status = "Invalid Access Credentials";
            break;
          default:
            status = "File Upload Failed"
            break;
        }
        this.handleFileUploadError(f.name, status);
      });
    });
  }

  render() {
    return (
      <div className="app-container">
        <div className="title-bar">
          <h3>Upload Files to Arxchitect</h3>
          <button
            onClick={this.handleUpload}
            className={
              `upload-button ${Object.keys(this.state.files).length > 0 ?
              "ready-to-upload" : ""}`
            }
          >
            <span className="upload-button-content">
              <i className="fa fa-cloud-upload upload-button-icon"/>
              <span>Upload</span>
            </span>
          </button>
        </div>
        <FileList
          files={this.state.files}
          onFileSelect={this.handleFileSelect}
          onRemoveFileFromList={this.handleFileRemove}
        />
      </div>
    );
  }
}

AppContainer.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default AppContainer;
