import React from 'react';
import cx from 'classnames';

interface FileUploadProps {
  register: any;
  name: string;
  label: string;
  isHorizontal?: boolean;
  value: any;
}

const FileUpload: React.FC<FileUploadProps> = ({ register, name, isHorizontal, label, value }) => {
  const uploadedFileName = value && value[0] ? value[0].name : '';

  return (
    <div className={cx('field', isHorizontal && 'is-horizontal')}>
      <label className={cx('label', isHorizontal && 'field-label')}>{label}</label>
      <div className={cx('control', isHorizontal ? 'field-body' : undefined)}>
        <div className="file has-name">
          <label className="file-label">
            <input className="file-input" ref={register} type="file" name={name} />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">Wybierz plik…</span>
            </span>
            {uploadedFileName && <span className="file-name">{uploadedFileName}</span>}
          </label>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
