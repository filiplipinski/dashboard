const express = require('express');
const FileController = require('./fileController');
const upload = require('../../config/multer-config');

const router = express.Router();

router.post('/upload', upload.any(), FileController.uploadFile);
// router.get('/all', FileController.getAllFiles);
router.get('/:id', FileController.getFile);

module.exports = router;
