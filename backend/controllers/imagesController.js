const fs = require('fs');
const multer = require('multer');

const upload = multer({ dest: 'images/' });

const getImage = (req, res) => {
  // add if statements for authorisation?

  const imageName = req.params.imageName;
  const readStream = fs.createReadStream(`images/${imageName}`);
  readStream.pipe(res);
};

const uploadImage = (req, res) => {
  const imageName = req.file.filename;

  // save to database here?

  console.log(imageName);
  res.send({ imageName });
};

module.exports = { getImage, uploadImage };
