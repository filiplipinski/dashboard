const FileService = require('./fileService');

const uploadFile = async (req, res) => {
  const { files } = req;

  try {
    if (!files) throw Error('No file provided');

    const uploadedFile = await FileService.uploadFile(req.files[0]);

    res.json({
      success: true,
      uploadedFile,
    });
  } catch (err) {
    res.status(400).json(err && err.message);
  }
};

const getFile = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const file = await FileService.getFile(id);

    // res.set('Content-disposition', 'attachment; filename=fname.ext');
    res.download(file.path, file.originalName);
  } catch (err) {
    res.status(400).json(err && err.message);
  }
};

module.exports = { uploadFile, getFile };
