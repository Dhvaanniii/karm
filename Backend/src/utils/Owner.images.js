const multer = require('multer');
const path = require('path');


const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../public/uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath); 
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); 
    }
});

// Initialize Multer with limits
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 
    },
    fileFilter: (req, file, cb) => {
        // Log for debugging
        console.log("Multer Filtering - OriginalName:", file.originalname, "MimeType:", file.mimetype);

        // Allow any image type for now to debug, we can restrict later
        if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
            console.log("File accepted by filter");
            return cb(null, true);
        } else {
            console.log("File rejected! Mime:", file.mimetype);
            cb(new Error('Error: Images only! (jpeg, jpg, png, gif, pdf)')); 
        }
    }
});


module.exports = upload;
