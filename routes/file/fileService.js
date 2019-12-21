const File = require('./fileModel');

const uploadFile = async file => {
  const uploadedFile = new File({
    path: file.path,
    originalName: file.originalname,
  });

  return uploadedFile
    .save()
    .then(data => data)
    .catch(err => {
      throw err;
    });
};

const getFile = async fileId => {
  return File.findById(fileId)
    .then(file => {
      if (file) return file;
      throw Error('There is no such a file in database');
    })
    .catch(err => {
      throw err;
    });
};

module.exports = { uploadFile, getFile };
