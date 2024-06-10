const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        let folder = '';

        switch (ext) {
            case '.pdf':
                folder = 'uploads/pdf';
                break;
            case '.txt':
                folder = 'uploads/txt';
                break;
            case '.csv':
                folder = 'uploads/csv';
                break;
            case '.jpg':
            case '.jpeg':
            case '.png':
            case '.gif':
                folder = 'uploads/img';
                break;
            default:
                return cb(new Error('Unsupported file type'), false);
        }

        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 } // 1MB limit
}).single('file');

exports.uploadFile = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send('File upload failed.');
        }
        res.status(200).send('File uploaded successfully.');
    });
};
