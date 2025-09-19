const multer =require('multer')

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./Uploads");
    },
    filename: (req, file, cb) => {
        return cb(null, Date.now() + file.originalname);
    },
})

const imageUpload = multer({
  storage: imageStorage,
});

module.exports =imageUpload