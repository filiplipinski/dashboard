import React from 'react';
import { saveAs } from 'file-saver';
import { FileType } from 'modules/Tickets/models/index';
import styles from './styles.module.scss';

interface UploadedFilesProps {
  uploadedFiles: Array<FileType>;
}

const UploadedFiles: React.FC<UploadedFilesProps> = ({ uploadedFiles }) => {
  const fetchFile = file => {
    fetch(`/api/files/${file._id}`)
      .then(data => data.blob())
      .then(data => {
        saveAs(data, file.originalName);
      });
  };

  return (
    <div className={styles.wrapper}>
      {uploadedFiles.length !== 0 && <strong className={styles.attachment}>Załączniki:</strong>}

      {uploadedFiles.map(file => (
        <a key={file._id} className={styles.link} onClick={() => fetchFile(file)}>
          {file.originalName}
        </a>
      ))}
    </div>
  );
};

export default UploadedFiles;
