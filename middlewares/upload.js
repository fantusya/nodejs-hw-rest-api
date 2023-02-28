const multer = require("multer");
const path = require("path");

// const tmpDir = path.join(__dirname, "../", "tmp");
const tmpDir = path.resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("REQ FROM MULTER", req);
    // console.log("FILE", file);
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    // console.log("file.originalname", file);
    // console.log("file.originalname", file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  // limits: {
  //   fileSize: 3145728,
  // },
});

module.exports = upload;
