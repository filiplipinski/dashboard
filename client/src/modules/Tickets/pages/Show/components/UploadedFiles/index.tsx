import React from 'react';
import { saveAs } from 'file-saver';
import useRequestApi, { IRequestData } from 'utils/http';
import { FileType } from 'modules/Tickets/models/index';

interface UploadedFilesProps {
  uploadedFiles: Array<FileType>;
}

const UploadedFiles: React.FC<UploadedFilesProps> = ({ uploadedFiles }) => {
  // TODO: dodac typy requestu
  // const { requestApi, data } = useRequestApi() as any;
  // 5dfbe71e94875e39147c472f

  const getFile = file => {
    fetch(`/api/files/${file._id}`)
      .then(data => data.blob())
      .then(data => {
        saveAs(data, file.originalName);
      });
  };
  return (
    <>
      <b>Załączniki:</b>
      {uploadedFiles.map(file => (
        <a
          key={file._id}
          style={{ textDecoration: 'underline', display: 'block' }}
          // onClick={() => requestApi('api/files/5dfbe57c286bb1266427a63c')}
          onClick={() => getFile(file)}
        >
          {file.originalName}
        </a>
      ))}
    </>
  );
};

export default UploadedFiles;
