import React, { useState } from 'react';
import download from 'downloadjs';
import useRequestApi, { IRequestData } from 'utils/http';

interface UploadedFilesProps {}

const UploadedFiles: React.FC<UploadedFilesProps> = () => {
  // TODO: dodac typy requestu
  const { requestApi, data } = useRequestApi() as any;
  // 5dfbe71e94875e39147c472f

  const fileName = 'ktora_maska.png';

  const getFile = () => {
    fetch('/api/files/5dfbe57c286bb1266427a63c')
      .then(data => data.blob())
      .then(data => {
        download(data, fileName);
      });
  };
  return (
    <>
      <a
        style={{ textDecoration: 'underline' }}
        // onClick={() => requestApi('api/files/5dfbe57c286bb1266427a63c')}
        onClick={() => getFile()}
      >
        {fileName}
      </a>
    </>
  );
};

export default UploadedFiles;
